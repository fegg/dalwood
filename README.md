TODO: 对于 Store 的想法，更好的结合 State 来控制事件的 Manager.
初步想法是参考 Android 的模式.
    
    // 定义常量
    var CONSTANTS = {
        ADD_USER: 'ADD_USER',
        EDIT_USER: 'EDIT_USER'
    };
    
    var dispatcher = new Dispatcher();
    
    // 创建 Actions 行为函数，避免使用 switch 影响变量作用域的共享
    var userActions = dispatcher.createActions({
        [CONSTANTS.ADD_USER]: function () {
            console.log('add user...');
        },
        [CONSTANTS.EDIT_USER]: function () {
            console.log('edit user...');
        }
    });

    // 根据需求，调度需要执行的 action 描述，type 是必传字段
    dispatcher.dispatch({
        type: CONSTANTS.ADD_USER,
        text: '添加用户'
    });

    dispatcher.dispatch({
        type: CONSTANTS.EDIT_USER,
        text: '修改用户'
    });