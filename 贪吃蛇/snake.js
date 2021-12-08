  //产生小蛇的函数
    (function (){
        var elements = []; // 存放小蛇的每个身体部分,方便变化后删除
        //小蛇的构造函数
        function Snake(width,height,direction) {
            //小蛇的每个部分的宽高
            this.width = width||20;
            this.height = height||20;
            //小蛇的身体
            this.body = [
                { x: 3, y: 2, color: "red" }, //头
                { x: 2, y: 2, color: "orange" }, //身体
                { x: 1, y: 2, color: "orange" }
            ];
            //方向
            this.direction = direction || "right";
        }

        //为原型添加方法，小蛇初始化方法
        Snake.prototype.init = function (map) {
            //循环遍历创建div
            for( var i=0; i<this.body.length; i++) {
                //数组中的每个元素都是一个对象
                var obj = this.body[i];
                //创建div
                var div = document.createElement("div");
                map.appendChild(div);
                //设置div样式
                div.style.position = "absolute";
                div.style.width = this.width + "px";
                div.style.height = this.height + "px";
                div.style.borderRadius = "50%";
                div.style.backgroundColor = obj.color;
                //横纵坐标
                div.style.left = obj.x*this.width+"px";
                div.style.top = obj.y*this.height+"px";
                
                //方向暂时不定

                //把div加入到elements数组中-----目的是为了删除
                elements.push(div)
            }
        }

        //为原型添加方法，小蛇动起来
        Snake.prototype.move = function (food,map) {
            //先删除之前的小蛇
            remove();
            //改变小蛇的身体位置的坐标
            var i = this.body.length - 1;
            for(i; i>0; i--) {
                this.body[i].x = this.body[i-1].x;
                this.body[i].y = this.body[i-1].y;
            }
            //判断方向----判断方向----改变小蛇头的坐标位置
            switch(this.direction) {
                case "right": this.body[0].x += 1;break;
                case "left": this.body[0].x -= 1; break;
                case "top": this.body[0].y -= 1; break;
                case "bottom": this.body[0].y += 1; break;
            }
        
            //判断有没有吃到食物
            //小蛇头坐标和食物坐标一致
            var headX = this.body[0].x*this.width;
            var headY = this.body[0].y*this.height;
            //判断小蛇的头坐标和食物坐标是否相同
            if(headX == food.x && headY == food.y) {
                //获取小蛇的尾巴，复制一份加入到小蛇的body中
                var last = this.body[this.body.length-1]
                this.body.push({
                    x:last.x,
                    y:last.y,
                    color:last.color
                });
                //删除食物（被吃掉）再，初始化食物
                food.init(map);

            }
        }

        //删除小蛇的私有函数
        function remove () {
            var i = elements.length - 1;
            for(; i>=0; i--) {
                //先从当前的子元素中找到其父元素，然后在删掉这个子元素
                elements[i].parentNode.removeChild(elements[i]);
                elements.splice(i,1);
            }
        }
        window.Snake = Snake;
    })();