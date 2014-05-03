(function(){
    'use strict';

    /**
     * @class Global.math.Random
     * utility for get random numbers.
     * @extends Global.core.BaseClass
     * @singleton
     */
    Global.define('Global.math.Random',{

        singleton: true,

        /**
         * return random number.
         * @param  {Number} max max number you want to get.
         * @return {Number} random number which smaller than number you passed.
         */
        getRandomNum: function(max) {
            return Math.floor( Math.random() * max + 1 );
        },

        /**
         * return random number list.
         * @param  {Number} max max number you want to get.
         * @return {Array} random number list.
         */
        getRandomNumList: function(num) {
            var i, j, tmp, random = new Array(num);
            random[0] = 0;

            for(i = num - 1; i > 0; i--){
                j = Math.floor(Math.random() * (i+1));
                tmp = random[i] || i;
                random[i] = random[j] || j;
                random[j] = tmp;
            }
            return random;
        }
    });
})();
