(function(){
    'use strict';

    /**
     * @class Global.util.RequestAnimationFramae
     * @extends Global.core.BaseClass
     * @singletone
     */
    Global.define('Global.util.RequestAnimationFrame', {

        singleton: true,

        init: function(config){
            this.polyfill();
            this._super(config);
        },

        start: function(callback){
            return this.raf.apply(window, [callback]);
        },
        cancel: function(id){
            return this.caf(id);
        },

        polyfill: function(){
            var win = window,
                raf = win.requestAnimationFrame ||
                      win.webkitRequestAnimationFrame ||
                      win.mozRequestAnimationFrame ||
                      win.msRequestAnimationFrame ||
                      win.oRequestAnimationFrame ||
                      function(func) { setTimeout(func, 1000 / 60); },
                caf = win.cancelAnimationFrame ||
                      win.cancelRequestAnimationFrame ||
                      win.webkitCancelAnimationFrame ||
                      win.webkitCancelRequestAnimationFrame ||
                      win.mozCancelAnimationFrame ||
                      win.mozCancelRequestAnimationFrame ||
                      win.msCancelAnimationFrame ||
                      win.msCancelRequestAnimationFrame ||
                      win.oCancelAnimationFrame ||
                      win.oCancelRequestAnimationFrame ||
                      function(id) { clearTimeout(id); };
            this.raf = raf;
            this.caf = caf;
        }
    });
})();
