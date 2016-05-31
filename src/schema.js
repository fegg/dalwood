/**
 * 对用户数据 schema 规则的限制
 * 当 dispatcher 开启 schema: true 的时候触发规则
*/

var extend = require('./extend');
var isUndefined = require('./utils').isUndefined;

var Schema = extend(null, {
    __construct: function (schema) {
        if (isUndefined(schema)) {
            throw new Error('must defined your schema object.');
        }

        this.__schema = schema;
    },

    /**
     * 判断 key 是否被 schema 定义
    */
    isDefined: function (key) {
        var ok = false;
        var schema = this.__schema;

        for (var i in schema) {
            if (i === key) {
                ok = true;
                break;
            }
        }

        return ok;
    }
});

module.exports = Schema;