var Utils = require('./utils'),
    hasOwn = Utils.hasOwn;

/**
 * @param Parent -> super class
 * @param props -> prototype props
 * @return Child -> child class
*/
var extend = function (Parent, props) {
    var Child = function () {
        if (Child.uber && hasOwn.call(Child.uber, '__construct')) {
            Child.uber.__construct.apply(this, arguments);
        }
        if (hasOwn.call(props, '__construct')) {
            Child.prototype.__construct.apply(this, arguments);
        }
    };

    var Parent = Parent || Object;

    var _F = function () { };
    _F.prototype = Parent.prototype;
    Child.prototype = new _F();
    Child.uber = Parent.prototype;
    Child.prototype.constructor = Child;

    for (var i in props) {
        if (hasOwn.call(props, i)) {
            Child.prototype[i] = props[i];
        }
    }

    return Child;
};

module.exports = extend;