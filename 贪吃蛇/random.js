    //生成随机数函数
    (function (win) {
        function Random() {

        }
        Random.prototype.getRandom = function (min, max) {
            return Math.floor(Math.random()*(max-min)+min);
        }
        window.Random = new Random();
    })(window);
    //console.log(Random.getRandom(2,5))

        //选择器方式获取map元素
    var map = document.querySelector(".map");