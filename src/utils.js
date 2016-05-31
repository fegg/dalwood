var hasOwn = Object.prototype.hasOwnProperty;

var isFunction = function (type) {
    return typeof type === 'function';
};

var isUndefined = function (o) {
    return o === void 0;
};

module.exports = {
    hasOwn: hasOwn,
    isFunction: isFunction,
    isUndefined: isUndefined
};