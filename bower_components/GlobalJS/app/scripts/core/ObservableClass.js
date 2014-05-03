(function(){
    'use strict';
    /**
     * @class Global.core.ObservableClass
     * class to extend to get observal method
     * @extends Global.event.EventDispatcher
     * @alternateClassName Global.ObservableClass
     */
    Global.define('Global.core.ObservableClass',{

        alias: 'Global.ObservableClass',

        extend: Global.event.EventDispatcher
    });
})();
