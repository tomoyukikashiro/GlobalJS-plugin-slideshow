(function(){
    'use strict';

    /**
     * @class Global.app.Router
     * @extend Global.core.BaseClass
     */
    Global.define('Global.app.Router',{

        /**
         * routing
         * @cfg {Object} path and controller class
         *
         *     routing: {
         *         '/'    : App.controller.Main,
         *         '/list': App.controller.List
         *     }
         */
        routing: {
        },

        /**
         * controllers
         * @cfg {Object} cache controller instance
         */
        controllers: {
        },


        /**
         * @method start
         * start routing.
         */
        start: function() {
            var pathName = location.pathname,
                routing  = this.getRouting(),
                Klass    = this._getController(pathName, routing),
                instance = Klass ? new Klass() : undefined;
            Klass = instance;
            this.controllers[pathName] = instance;
        },

        /**
         * @method
         */
        _getController: function(path, routing){
            var pattern = /\/$/,
                hasLastSlash = pattern.test(path) ? path : path + '/',
                noLastSlash  = pattern.test(path) ? path.slice(0, -1) : path,
                hasLastSlashClass = routing[hasLastSlash],
                noLastSlashClass = routing[noLastSlash];

            return hasLastSlashClass ? hasLastSlashClass : noLastSlashClass;
        }

    });
})();
