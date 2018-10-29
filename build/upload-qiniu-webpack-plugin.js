'use strict';

var _qiniu = require('qiniu');

var qiniu = _interopRequireDefault(_qiniu).default;

var _promise = require('promise');

var promise = _interopRequireDefault(_promise).default;

var _path = require('path');

var pathJ = _interopRequireDefault(_path).default;

var _slash = require('slash');

var slash = _interopRequireDefault(_slash).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


class QiniuPlugin {

  constructor(options) {
    if (!options || !options.ACCESS_KEY || !options.SECRET_KEY) {
      throw new Error('ACCESS_KEY and SECRET_KEY must be provided');
    }
    this.options = Object.assign({}, options);
    qiniu.conf.ACCESS_KEY = this.options.ACCESS_KEY;
    qiniu.conf.SECRET_KEY = this.options.SECRET_KEY;
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      const assets = compilation.assets;
      const hash = compilation.hash;
      const mac = new qiniu.auth.digest.Mac(this.options.ACCESS_KEY, this.options.SECRET_KEY);
      const config = new qiniu.conf.Config();
      config.zone = qiniu.zone.Zone_z2;
      const {
        bucket,
        include,
        prefix,
      } = this.options;
      let {
        path = '[hash]',
      } = this.options;

      path = path.replace('[hash]', hash);
      const promises = Object.keys(assets).filter((fileName) => {
        let valid = assets[fileName].emitted;
        if (include) {
          valid = valid &&
            include.some(
              (includeFileName) => {
                if (includeFileName instanceof RegExp) {
                  return includeFileName.test(fileName);
                }
                return includeFileName === fileName;
              },
            );
        }
        return valid;
      }).map((fileName) => {
        const key = prefix + slash(pathJ.join(path, fileName));
        var options = {
          scope: `${bucket}:${key}`
        }
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        const extra = new qiniu.form_up.PutExtra();
        const formUploader = new qiniu.form_up.FormUploader(config);
        const promise = new Promise((resolve, reject) => {
          const begin = Date.now();
          formUploader.putFile(uploadToken, key, assets[fileName].existsAt, extra, (err, ret, ref) => {
            if (!err) {
              if (ref.statusCode == 200) {
              	// console.log("上传文件：上传成功" + ret)
                resolve({
                  ...ret,
                  duration: Date.now() - begin,
                });
              } else {
                console.log(ref.statusCode);
                console.log(ret);
                reject(ref.statusCode);
              }
            } else {
            	console.log(err)
              reject(err);
            }
          });
        });
        return promise;
      });

      Promise
        .all(promises)
        .then((res) => {
        	console.log("上传文件：上传成功")
          console.log(res); // eslint-disable-line no-console
          callback();
        })
        .catch((e) => {
        	console.log(e)
          callback(e);
        });
    });
  }
}

module.exports = QiniuPlugin;
// export default QiniuPlugin;
