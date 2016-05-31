var Dispatcher = require('../../index').Dispatcher;

var CONSTANTS = {
    ADD_USER: 'ADD_USER',
    EDIT_USER: 'EDIT_USER'
};

var dispatcher = new Dispatcher();
var userActions = dispatcher.createActions({
    [CONSTANTS.ADD_USER]: function () {
        console.log('add user...');
    },
    [CONSTANTS.EDIT_USER]: function () {
        console.log('edit user...');
    }
});

dispatcher.dispatch({
    type: CONSTANTS.ADD_USER,
    text: '添加用户'
});

dispatcher.dispatch({
    type: CONSTANTS.EDIT_USER,
    text: '修改用户'
});