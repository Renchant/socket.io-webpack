// 大坑啊！！！注意express 顺序尝试
var express = require('express');
var app = express();
var PORT = require('./port') || 3001;
var server = app.listen(PORT);
var io = require('socket.io').listen(server);

var webpack = require('webpack')
var chalk = require('chalk')
var logger = require('morgan')

var webpackConfig = require('./webpack.config')

var localhost = 'http://localhost';


var compiler = webpack( webpackConfig )

var devMiddleware = require( 'webpack-dev-middleware')( compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true,
        chunks: false,
        reasons: true,
        errorDetails: true
    }
} )

devMiddleware.waitUntilValid(function () {
    var uri = localhost + ':' + PORT + '/index.html'
    console.log(chalk.yellow('\n 你在监听 ' + uri + '\n'))
})

// wdbpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 客户端数
var clientCount = 0;
// 存储socket数
var socketMap = {};

app.use( '/src', express.static('src') )

app.use( devMiddleware )
app.use( hotMiddleware )

app.use( logger() )


var bindListen = function(socket, event){
    socket.on(event, function(data){
        if(socket.clientNum % 2 == 0){
            if( socketMap[socket.clientNum - 1] ){
                socketMap[socket.clientNum - 1].emit(event, data);
            }
        } else { 
            if( socketMap[socket.clientNum + 1] ){
                socketMap[socket.clientNum + 1].emit(event, data);
            }
        }
    });
}


// 服务端逻辑
io.on('connection', function(socket){
    clientCount = clientCount + 1;
    socket.clientNum = clientCount;
    console.log(clientCount);
    socketMap[clientCount] = socket;

    if( clientCount % 2 === 1){
        // 当前socket为单数，要求等待
        socket.emit('waiting', 'waiting for another person')
    }else{
        // 当前socket为双数企且存在，开始游戏，前一个socket也开始游戏
        if(socketMap[(clientCount - 1)]){
            socket.emit('start');
            socketMap[(clientCount - 1)].emit('start');
        }else{
            socket.emit('leava');
        }
    }

    bindListen(socket, 'init');
    bindListen(socket, 'next');
    bindListen(socket, 'rotate');
    bindListen(socket, 'right');
    bindListen(socket, 'down');
    bindListen(socket, 'left');
    bindListen(socket, 'fall');
    bindListen(socket, 'fixed');
    bindListen(socket, 'line');
    bindListen(socket, 'time');
    bindListen(socket, 'lose');
    bindListen(socket, 'addSkill');
    bindListen(socket, 'addLine');
    // 同步技能 效果状态
    bindListen(socket, 'addRemoteLine');
    bindListen(socket, 'useSkill');
    bindListen(socket, 'deleteLine');

    socket.on('disconnect', function(){
        if(socket.clientNum % 2 == 0){
            if( socketMap[socket.clientNum - 1] ){
                socketMap[socket.clientNum - 1].emit('leave');
            }
        } else { 
            if( socketMap[socket.clientNum + 1] ){
                socketMap[socket.clientNum + 1].emit('leave');
            }
        }
        delete socketMap[socket.clientNum];
    })
    socket.on('message', function(mes){
		socket.emit('message say: ' + mes);
	});
});