import { squareFactory } from './squareFactory';
export const Game = function(){
    //初始数据
    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // 游戏区域容器
    var gameDivs = [];
    var nextDivs = [];

    // dom 父容器
    var gameCon;
    var nextCon;
    var timeCon;
    var scoreCon;
    var overCon;

    // 分数
    var score = 0; 

    // 当前方块
    var cur;
    // 下一个方块
    var next;
    
    // 初始化框
    var initDiv = function(container,data,divs){
        for(var i=0; i<data.length; i++){
            var dataDiv = [];
            for(var j=0; j<data[0].length; j++){
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 40) + 'px';
                newNode.style.left = (j * 40) + 'px';
                container.appendChild(newNode);
                dataDiv.push(newNode);
            }
            divs.push(dataDiv);
        }
    }
    
    // 更新数据
    var refreshData = function(data,divs){
        for(var i=0;i<data.length; i++){
            for(var j=0; j<data[0].length; j++){
                if(data[i][j] == 0){
                    divs[i][j].className = 'none';
                }else if(data[i][j] == 1){
                    divs[i][j].className = 'done';
                }else if(data[i][j] == 2){
                    divs[i][j].className = 'current';
                }
            }
        }
    }
    // 清除数据
    var clearData = function(){
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin, i, j)){
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    }
    // 设置数据
    var setData = function(){
        // i为行j为列
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin, i, j)){
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    }
    // 检查点是否合法
    var check = function(pos,x,y){
        return ((pos.x + x) >= 0 && (pos.x + x) < gameData.length && (pos.y + y) >= 0 && (pos.y + y) < gameData[0].length && (gameData[pos.x + x][pos.y + y] != 1))
    }

    // 检查数据是否合法
    var isValid = function(pos, data){
        var flag = true;
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[0].length;j++){
                if(data[i][j] != 0){
                    if(!check(pos, i, j)){
                        flag = false;
                    }
                } 
            }
        }
        return flag;
    }

    // 下移
    var dowm = function(){
        var fall;
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refreshData(gameData, gameDivs);
            fall = true;
        }else{
            fall = false;
        }
        return fall;
    }

    // 左移
    var left = function(){
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refreshData(gameData, gameDivs);
        }
    }

    // 左移
    var right = function(){
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refreshData(gameData, gameDivs);
        }
    }

    // 旋转
    var rotate = function(){
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refreshData(gameData, gameDivs);
        }
    }

    // 固定后变色
    var fixed = function(){
        for(var i=0;i<cur.data.length;i++){
            for(var j=0;j<cur.data[0].length;j++){
                if(check(cur.origin, i, j)){
                    if(gameData[cur.origin.x + i][cur.origin.y + j] == 2){
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshData(gameData, gameDivs);
    }
    // 使用下一个方块
    var performNext = function(type, dir){
        cur = next;
        setData();
        next = squareFactory.prototype.make(type, dir);
        refreshData(gameData, gameDivs);
        refreshData(next.data, nextDivs);
    }

    // 消行（满足条件）
    var checkClear = function(){
        var line = 0;
        for(var i = gameData.length - 1; i >= 0; i--){
            // 判断能否消除
            var clear = true;
            for(var j = 0; j < gameData[0].length; j++){
                if(gameData[i][j] != 1){
                    clear = false;
                    break;
                }
            }
            if(clear){
                line += 1;
                for(var m = i; m > 0; m--){
                    for(var n =0; n < gameData[0].length; n++){
                        // 向下移
                        gameData[m][n] = gameData[m-1][n];
                    }
                }
                i++;
            }       
        } 
        return line;
    }

    // 直接消除
    var deleteLine = function(length){
        for(var i = gameData.length - 1; i >= 0; i--){
            for(var j = 0; j < gameData[0].length; j++){
                console.log(j);
                // 向下移
                if(i < length){
                    gameData[i][j] = 0;
                }else{
                    gameData[i][j] = gameData[(i - length)][j];
                }
            }
        }
        refreshData(gameData, gameDivs);
    }

    // 结束
    var checkOver = function(){
        var over = false;
        for(var i = 0;i<gameData[0].length; i++){
            if(gameData[1][i] == 1){
                over = true
            }
        }
        return over
    }

    // 计时器
    var setTime = function(time){
        timeCon.innerHTML = time;
    }

    // 设置分数
    var setScore = function(line){
        var s = 0;
        switch(line){
        case 1:
            s = 1;
            break;
        case 2:
            s = 3;
            break;
        case 3: 
            s = 6;
            break;
        case 4: 
            s = 10;
            break;
        default: 
            break;
        }
        score += s;
        scoreCon.innerHTML = score;
    }

    // 游戏结束
    var gameOver = function(win){
        overCon.innerHTML = win ? '你赢了' : '你输了';
    }

    // 加干扰行 传进来是个二维数组
    var addTailLines = function(lines){
        // 其余行往上移
        for(var i = 0; i < gameData.length - lines.length; i++){
            gameData[i] = gameData[ i + lines.length ];
        }
        // 底部lines.length行被替换
        for(var j = 0; j < lines.length; j++){
            gameData[gameData.length - lines.length + j] = lines[j];
        }
        // 当前块往上移
        cur.origin.x = cur.origin.x - lines.length;
        if(cur.origin.x < 0){
            cur.origin.x = 0;
        }
        refreshData(gameData, gameDivs);
    }

    // 刷新技能池
    var setSkill = function(doms, skill){
        for(var i = 0; i < skill.length; i++){
            if(skill[i] == 0){
                doms[i].className = 'skill-none';
            }else if(skill[i] == 1){
                doms[i].className = 'bao';
            }else if(skill[i] == 2){
                doms[i].className = 'shen';
            }else if(skill[i] == 3){
                doms[i].className = 'wan';
            }else if(skill[i] == 4){
                doms[i].className = 'gui';
            }
        }
    }

    // 初始化 type代表square类型，dir代表第几种（方向）skill为技能池
    var init = function(doms, type, dir, skill){
        // 全局
        gameCon = doms.gameCon;
        nextCon = doms.nextCon;
        timeCon = doms.timeCon;
        scoreCon = doms.scoreCon;
        overCon = doms.overCon;
        next = squareFactory.prototype.make(type, dir);
        initDiv(gameCon, gameData, gameDivs);
        initDiv(nextCon, next.data, nextDivs);
        refreshData(next.data, nextDivs);
        setSkill(doms.skillCon, skill);
    }

    this.init = init;
    this.dowm = dowm;
    this.right = right;
    this.left = left;
    this.rotate = rotate;
    this.fall = function(){
        while(dowm());
    };
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkOver = checkOver;
    this.setTime = setTime;
    this.setScore = setScore;
    this.gameOver = gameOver;
    this.addTailLines = addTailLines;
    this.setSkill = setSkill;
    this.deleteLine = deleteLine;
}