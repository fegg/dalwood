// - 注册：register
// - 取消注册：unregister
// - 取消所有注册监听：unregisterAll
// --------------------------------------------
// - 分发开始：startDispatching
// - 分发结束：stopDispatching
// --------------------------------------------
// - 执行分发：dispatch
// - 分发的阶段性变量：start -> pending -> start dispatch -> run -> end dispatch -> end
// --------------------------------------------
// - TODO: 中间件功能：use
// - TODO: 更好的管理内存：clean

'use strict';

var extend = require('./extend'),
    Utils = require('./utils'),
    isFunction = Utils.isFunction,
    isUndefined = Utils.isUndefined;

/**
 * listener id prefix
 */
var ID_PREFIX = 'ID_EVENT_';

var Dispatcher = extend(null, {
    __construct: function () {
        // - listener id, start 1
        this._id = 1;

        // - listeners, register function target
        this._listeners = {};

        // - all listener id, to clean listeners
        this._ids = [];

        // - state sign, control listener status
        // record listener is pending
        this._isPending = {};
    },
    dispatch: function (action) {
        this._startDispatching(action);
        try {
            for (var id in this._listeners) {
                if (this._isPending[id]) {
                    continue;
                }
                this._call(id);
            }
        } finally {
            this._stopDispatching();
        }
    },
    register: function (func) {
        if (!isFunction(func)) {
            throw new Error('second argument must [function] type.');
        }

        var id = ID_PREFIX + this._id++;
        this._listeners[id] = func;
        this._ids.push(id);

        return id;
    },
    unregister: function (id) {
        delete this._listeners[id];
    },
    unregisterAll: function () {
        var ids = this._ids;
        var n = ids.length;
        if (n > 0) {
            for (var i = 0; i < n; ++i) {
                delete this._listeners[ids[i]];
            }
        }
    },
    createActions: function (actions) {
        // when create actions, lazy execute register action function.
        this.register(function (action) {
            actions[action.type]();
        });
    },
    _call: function (id) {
        this._isPending[id] = true;
        this._listeners[id](this._action);
    },
    _startDispatching: function (action) {
        for (var id in this._listeners) {
            this._isPending[id] = false;
        }

        this._action = action;
    },
    _stopDispatching: function () {
        delete this._action;
    }
});

module.exports = Dispatcher;