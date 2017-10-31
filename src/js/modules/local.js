import { Game } from './game';
export const Local = function(socket){
    var game;
    // 定时器
    var timer = null;
    // 时间间隔
    var timeOut = 500;
    var timeCount = 0;
    var time = 0;

    // 技能池0为空 1为地爆天星，2为神罗天征，3为万象天引，4为尸鬼封尽
    var skill = [0, 0];
    // 技能盒子
    var skillCon= [
        document.getElementById('local-one'),
        document.getElementById('local-two'),
    ];

    // 随机生成技能3或4
    var skillThreeOrFor = function(){
        var arr = [3,4];
        return arr[(Math.ceil(Math.random() * 2) - 1)]
    }

    var stop = function(){
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }

    // 随机生成干扰行lines的二维数组
    var RandomGeneraArray = function(lineNum){
        var lines = [];
        for(var i = 0; i < lineNum; i++){
            var line = [];
            // 二维数组每一组10行
            for(var j = 0; j < 10; j++){
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    } 

    //生成随机数
    var RandomNum = function(type){
        return type === 'type' ? (Math.ceil(Math.random() * 7) - 1) : (Math.ceil(Math.random() * 4) - 1)
    }

    // 时间计算函数
    var timeFun = function(){
        timeCount += 1;
        if(timeCount == Math.ceil(1000 / timeOut)){
            timeCount = 0;
            time += 1;
            game.setTime(time);
            socket.emit('time', time);
            // test 
            /* if( time % 10 == 0){
                if( time > 30 ){
                    game.addTailLines(RandomGeneraArray(2));
                }else{
                    game.addTailLines(RandomGeneraArray(1));
                }
            } */
        }
    }

    // 技能树规则
    var skillTree = function(line){
        if(!line) return
        switch(line){
            // 获得一段技能
            case 2:
                for(var i = 0; i < skill.length; i++){
                    if(skill[i] == 0){
                        skill[i] = 1;
                        socket.emit('addSkill', skill);
                        return
                    }else if(skill[i] == 1){
                        skill[i] = 2;
                        socket.emit('addSkill', skill);
                        return
                    }
                }
                break;
            // 获得二段技能
            case 3:
                for(var i = 0; i < skill.length; i++){
                    if(skill[i] == 0){
                        skill[i] = 2;
                        socket.emit('addSkill', skill);
                        return
                    }else if(skill[i] == 2){
                        skill[i] = skillThreeOrFor();
                        socket.emit('addSkill', skill);
                        return
                    }else if(skill[i] == 1){
                        // 考虑二技能状态
                        if(skill[i + 1]){
                            if(skill[i + 1] < 1){
                                skill[i + 1] = 2;
                                socket.emit('addSkill', skill);
                                return
                            }else if(skill[i + 1] == 2){
                                skill[i + 1] = skillThreeOrFor();
                                socket.emit('addSkill', skill);
                                return
                            }
                        }else{
                            skill[i] == 2;
                            socket.emit('addSkill', skill);
                            return
                        }
                    }
                }
                break;
            // 获得终极技能
            case 4:
                for(var i = 0; i < skill.length; i++){
                    if(skill[i] == 0){
                        skill[i] = skillThreeOrFor();
                        socket.emit('addSkill', skill);
                        return
                    }else if(skill[i] == 1){
                        skill[i] = skillThreeOrFor();
                        socket.emit('addSkill', skill);
                        return
                    }else if(skill[i] == 2){
                        skill[i] = skillThreeOrFor();
                        socket.emit('addSkill', skill);
                        return
                    }
                }
                break;
        }
                
    }

    var move = function(){
        timeFun();
        if(!game.dowm()){
            game.fixed();
            socket.emit('fixed'); 
            // 消行,消了几行 
            var line = game.checkClear();
             
            if(line){
                game.setScore(line);
                socket.emit('line', line);
                if( line > 1){
                    skillTree(line);
                    game.setSkill(skillCon, skill);
                }
            }
            if(game.checkOver()){
                game.gameOver(false);
                // socket.emit('lose');
                document.getElementById('remote_gameover').innerHTML = '你赢了';
                stop();
            }else{
                var t = RandomNum('type');
                var d = RandomNum('dir');
                game.performNext(t, d);
                socket.emit('next', {
                    type: t,
                    dir: d
                })
            }
        }else{
            socket.emit('down');
        }
    }

    // 绑定键盘事件
    var bindKeyEvent = function(){
        document.onkeydown = function(e){
            e.preventDefault();
            // up
            if(e.keyCode == 38){
                game.rotate();
                socket.emit('rotate');  
            // right
            }else if(e.keyCode == 39){  
                game.right();
                socket.emit('right'); 
            // dowm
            }else if(e.keyCode == 40){
                game.dowm();
                socket.emit('down'); 
            // left
            }else if(e.keyCode == 37){
                game.left();
                socket.emit('left'); 
            // space
            }else if(e.keyCode == 32){
                game.fall();  
                socket.emit('fall'); 
            }else if(e.keyCode == 49 || e.keyCode == 97){
                var index = skill[0];
                if( index == 1){
                    socket.emit("addLine", RandomGeneraArray(1));
                }else if(index == 2){
                    socket.emit("addLine", RandomGeneraArray(2));
                }else if(index == 3){
                    socket.emit("addLine", RandomGeneraArray(4));
                }else if(index == 4){
                    game.deleteLine(4);
                    socket.emit("deleteLine", 4);
                }
                skill[0] = 0;
                game.setSkill(skillCon, skill);
                socket.emit('useSkill', skill);
            }else if(e.keyCode == 50 || e.keyCode == 97){
                var index = skill[0];
                if( index == 1){
                    socket.emit("addLine", RandomGeneraArray(1));
                }else if(index == 2){
                    socket.emit("addLine", RandomGeneraArray(2));
                }else if(index == 3){
                    socket.emit("addLine", RandomGeneraArray(4));
                }else if(index == 4){
                    
                }
                skill[1] = 0;
                game.setSkill(skillCon, skill);
                socket.emit('useSkill', skill);
            }
        }
    }

    var start = function(){
        var doms = {
            gameCon: document.getElementById('local_game'),
            nextCon: document.getElementById('local_next'),
            timeCon: document.getElementById('local_time'),
            scoreCon: document.getElementById('local_score'),
            overCon: document.getElementById('local_gameover'),
            skillCon: skillCon
        }
        game = new Game();
        // 生成积木的种类
        var type = RandomNum('type');
        // 生成积木的方向
        var dir = RandomNum('dir');
        game.init(doms, type, dir, skill);
        socket.emit('init', {
            type: type,
            dir: dir
        })
        bindKeyEvent();
        var t = RandomNum('type');
        var d = RandomNum('dir');
        game.performNext(t, d);
        socket.emit('next', {
            type: t,
            dir: d
        })
        timer = setInterval(move, timeOut);
    };
     
    socket.on('start', function(){
        var waiting = document.getElementById('waiting');
        waiting.innerHTML = '';
        start();
    });

    socket.on('lose', function(){
        game.gameOver(true);
        stop();
    });

    socket.on('leave', function(){
        document.getElementById('local_gameover').innerHTML = '对方已离线';
        document.getElementById('remote_gameover').innerHTML = '已离线';
        stop();
    });

    socket.on('addLine', function(data){
        game.addTailLines(data);
        socket.emit('addRemoteLine', data);
    });

}