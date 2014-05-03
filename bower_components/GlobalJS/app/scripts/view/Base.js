(function(){
    'use strict';

    /**
     * @class Global.view.Base
     * base class of view.
     * @extend Global.view.Base
     */
    Global.define('Global.view.Base',{

        extend: Global.core.ManipulateDomClass,

        EVENT: {
            SHOW: 'show',
            HIDE: 'hide'
        },

        show: function(){
            var $elm = this.get$elm();

            $elm.show();
            this.dispatchEvent(this.EVENT.SHOW);
        },

        hide: function(){
            var $elm = this.get$elm();

            $elm.hide();
            $elm.remove();
            this.dispatchEvent(this.EVENT.HIDE);
        }

    });
})();
