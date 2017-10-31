import { Game } from './game';
export const Remote = function(socket){
    var game;
    // 技能池0为空 1为地爆天星，2为神罗天征，3为万象天引，4为尸鬼封尽
    var skill = [0, 0];
    // 技能盒子
    var skillCon =  [
        document.getElementById('remote-one'),
        document.getElementById('remote-two')
    ]

    var bindEvents = function(){
        socket.on('init', function(data){
            start(data.type, data.dir);
        });

        socket.on('next', function(data){
            game.performNext(data.type, data.dir);
        });

        socket.on('right', function(data){
            game.right();
        });

        socket.on('rotate', function(data){
            game.rotate();
        });

        socket.on('down', function(data){
            game.dowm();
        });

        socket.on('left', function(data){
            game.left();
        });

        socket.on('fall', function(data){
            game.fall();
        });

        socket.on('fixed', function(data){
            game.fixed();
        });

        socket.on('line', function(data){
            // console.log(data);
            game.setScore(data);
            game.checkClear();
        });

        socket.on('time', function(data){
            game.setTime(data);
        });

        socket.on('lose', function(data){
            game.gameOver(false);
            stop();
        });

        socket.on('addSkill', function(data){
            game.setSkill(skillCon, data);
        });

        socket.on('addRemoteLine', function(data){
            game.addTailLines(data);
        });

        socket.on('useSkill', function(data){
            console.log(data);
            game.setSkill(skillCon, data);
        });

        socket.on('deleteLine', function(data){
            game.deleteLine(data);
        });

        socket.on('leave', function(){
            document.getElementById('remote_gameover').innerHTML = '已离线';
            stop();
        });

    }
    var start = function(type, dir){
        var doms = {
            gameCon: document.getElementById('remote_game'),
            nextCon: document.getElementById('remote_next'),
            timeCon: document.getElementById('remote_time'),
            scoreCon: document.getElementById('remote_score'),
            overCon: document.getElementById('remote_gameover'),
            skillCon: [
                document.getElementById('remote-one'),
                document.getElementById('remote-two'),
            ]
        }
        game = new Game();
        game.init(doms, type, dir, skill);
    };

    bindEvents();
}