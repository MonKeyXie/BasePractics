   //封装---游戏对象
    (function (){
        var that=null;
        //游戏的构造函数
        function Game (map) {
            this.food = new Food();
            this.snake = new Snake();
            this.map = map;
            that = this;
        }
        //添加原型方法----初始化游戏
        Game.prototype.init = function () {
            //初始化食物
            this.food.init(this.map);  //? 
            //初始化小蛇
            this.snake.init(this.map);
            //调用自动移动小蛇的方法,且判断是否撞墙
            this.runSnake(this.food, this.map);
            //调用按键的方法，控制小蛇移动
            this.bindKey();
        }
        
        //添加原型方法----设置小蛇可以自动跑起来
        Game.prototype.runSnake = function (food,map) {
            //自动去移动
            var timeId = setInterval(function () {
                //此时thi指向window,bind(that)改变指向
                //移动小蛇
                this.snake.move(this.food,this.map);
                //console.log(this.snake.direction)
                //初始化小蛇
                this.snake.init(this.map);
                //纵坐标的最大值
                var maxX = map.offsetWidth/this.snake.width;
                var maxY = map.offsetHeight/this.snake.height;
                //小蛇的头的坐标
                var headX = this.snake.body[0].x;
                var headY = this.snake.body[0].y;
                //判断是否撞墙，游戏结束
                if(headX<0||headX>maxX||headY<0||headY>=maxY){
                    //撞墙了
                    clearInterval(timeId);
                    alert("游戏结束");
                }
            }.bind(that),150);  //把this绑定到Game的实例化对象上
        }


        //添加原型方法----添加原型方法----设置用户按键，改变小蛇的移动方向
        Game.prototype.bindKey = function () {
            //获取按键按键，改变小蛇方向
            document.addEventListener("keydown",function(e) {
                //这里的this是document,应该转换
                //获取按键的值
                switch (e.keyCode) {
                    case 37 : if (this.snake.direction !=="right"){ this.snake.direction = "left"};break;
                    case 38 : if (this.snake.direction !== "bottom") { this.snake.direction = "top" };break;
                    case 39 : if (this.snake.direction !== "left") {this.snake.direction = "right"};break;
                    case 40 : if (this.snake.direction !== "top") {this.snake.direction = "bottom"};break;
                }
            }.bind(that),false)
        }
        window.Game = Game;
    })();
    
    //选择器方式获取map元素
    var map = document.querySelector(".map");