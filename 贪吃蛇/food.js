 //产生小方块（食物）的函数
    (function (win){
        var elements = []; //保存每个小方块食物的
        //食物的构造函数
        function Food (width,height,color) {
            this.width = width||20;
            this.height = height||20;
            this.color = color||"pink";
            //坐标值
            this.x = 0;
            this.y = 0;
            this.element = document.createElement("div");
        };
        //初始化小方块显示的效果及位置
        Food.prototype.init = function (map) {
            //先删除小方块
            remove()
            //初始化 
            var div = this.element;
            div.style.width = this.width+"px";
            div.style.height = this.height+"px";
            div.style.borderRadius = "50%";
            div.style.backgroundColor = this.color;
            div.style.position = "absolute";
            map.appendChild(div);
            this.render(map);
            //食物保存到数组中，方便删除
            elements.push(div);
        };
        //产生随机位置
        Food.prototype.render= function (map) {
            //随机产生横纵坐标
            this.x = Random.getRandom(0, map.offsetWidth/this.width)*this.width;
            this.y = Random.getRandom(0, map.offsetHeight/this.height) * this.height;
            var div = this.element;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
        }
        
        //把构造函数Food暴露给全局
        win.Food = Food;

        //私有函数----删除食物
        function remove(){
            for( var i=0; i<elements.length; i++ ) {
                var ele = elements[i];
                //通过其父元素删除页面里的食物
                ele.parentNode.removeChild(ele);
                //再把elements中的子元素删掉
                elements.splice(i,1)
            }

        }
    })(window);