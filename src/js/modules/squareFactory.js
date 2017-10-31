import { Square } from './square';

// |
var Square1 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square1.prototype =  Square.prototype;

// 山
var Square2 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [0, 2, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square2.prototype =  Square.prototype;

//  |——
var Square3 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [2, 0, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square3.prototype =  Square.prototype;

// ——|
var Square4 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square4.prototype =  Square.prototype;

// 田
var Square5 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square5.prototype =  Square.prototype;

var Square6 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square6.prototype =  Square.prototype;

var Square7 = function(){
    Square.call(this);
    // 旋转数组    
    this.rotateArr = [
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square7.prototype =  Square.prototype;

export const squareFactory = function(){}
// index为类型，dir为方向
squareFactory.prototype.make = function(type, dir){
    var s;
    type += 1;
    switch(type){
    case 1: 
        s = new Square1();
        break;
    case 2: 
        s = new Square2();
        break;
    case 3: 
        s = new Square3();
        break;
    case 4: 
        s = new Square4();
        break;
    case 5: 
        s = new Square5();
        break;
    case 6: 
        s = new Square6();
        break;
    case 7: 
        s = new Square7();
        break;
    default: 
        break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
}