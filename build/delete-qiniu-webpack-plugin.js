'use strict';

var _qiniu = require('qiniu');

var _qiniu2 = _interopRequireDefault(_qiniu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteqiniuPlugin {
  constructor(options) {
    if (!options || !options.ACCESS_KEY || !options.SECRET_KEY) {
      throw new Error('ACCESS_KEY and SECRET_KEY must be provided');
    }
    if (!options.prefix || !options.bucket) {
      throw new Error('bucket and prefix must be provided');
    }
    this.options = Object.assign({}, options);
    _qiniu2.default.conf.ACCESS_KEY = this.options.ACCESS_KEY;
    _qiniu2.default.conf.SECRET_KEY = this.options.SECRET_KEY;
  }
  apply(compiler) {
    compiler.plugin('entry-option', (compilation) => {
      var options = {
        limit: 100,
        prefix: this.options.prefix
      };
      var bucket = this.options.bucket;
      var mac = new _qiniu2.default.auth.digest.Mac(this.options.ACCESS_KEY, this.options.SECRET_KEY);
      var config = new _qiniu2.default.conf.Config();
      //config.useHttpsDomain = true;
      config.zone = _qiniu2.default.zone.Zone_z0;
      var bucketManager = new _qiniu2.default.rs.BucketManager(mac, config);
      bucketManager.listPrefix(bucket, options, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          throw err;
        }
        if (respInfo.statusCode == 200) {
          //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          //指定options里面的marker为这个值
          var nextMarker = respBody.marker;
          var commonPrefixes = respBody.commonPrefixes;
          var items = respBody.items;
          var deleteOperations = []
          items.forEach(function(item) {
            if (item.key) {
              deleteOperations.push(_qiniu2.default.rs.deleteOp(bucket, item.key))
            }
            // console.log(item.putTime);
            // console.log(item.hash);
            // console.log(item.fsize);
            // console.log(item.mimeType);
            // console.log(item.endUser);
            // console.log(item.type);
          });
          if (deleteOperations.length > 0) {
            bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
              if (err) {
                console.log(err);
                //throw err;
              } else {
                // 200 is success, 298 is part success
                if (parseInt(respInfo.statusCode / 100) == 2) {
                  respBody.forEach(function(item) {
                    if (item.code == 200) {
                      console.log(item.code + "\tsuccess");
                    } else {
                      console.log(item.code + "\t" + item.data.error);
                    }
                  });
                } else {
                  console.log(respInfo.deleteusCode);
                  console.log(respBody);
                }
              }
            });
          } else {
            console.log('删除原有文件：没有找到对应文件')
          }
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
    })
  }
}
module.exports = DeleteqiniuPlugin;
