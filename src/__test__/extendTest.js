var extend = require('../extend');

var Base = extend(null, {
    __construct: function (name) {
        this.name = name;
    },
    getName: function () {
        return this.name;
    }
});

var b = new Base(1);
console.log(b.getName());

var BaseEvent = extend(Base, {
    getName: function () {
        return this.name;
    }
});

var baseEvent = new BaseEvent(2);
console.log(baseEvent.getName());

console.log(baseEvent instanceof Base);
console.log(baseEvent instanceof BaseEvent);