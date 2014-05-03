(function(){

    'use strict';

    /**
     * @class Global.view.SlideShow
     */
    Global.define('Global.view.SlideShow', {

        extend: Global.core.ManipulateDomClass,

        /* jshint ignore:start */
        tpl: [
        ].join(''),
        /* jshint ignore:end */

        id: '',

        cls: 'g-slideshow',

        $elm: null,

        compiledTpl: null,

        outerWidth: 0,

        outerHeight: 0,

        itemWidth: 0,

        itemHeight: 0,

        swiperConfig: {},

        /**
         * @param {Object} config
         */
        init: function(config){
            this._super(config);
            this._compileTpl();
        },

        _compileTpl: function(){
            this.compiledTpl = _.template(this.getTpl());
        },

        start: function(){
            var config = this.getSwiperConfig(),
                html = this._create(), instance;
            this.$elm.append(html);
            instance = new Swiper('#' + this.getId(), config);

            this._bindSwiper(instance);
        },

        _bindSwiper: function(instance){
            var $elm = this.get$elm();
            $elm.on('mouseenter', '.swiper-slide', function(){
                instance.stopAutoplay();
            });
            $elm.on('mouseleave', '.swiper-slide', function(){
                instance.startAutoplay();
            });
        },

        _create: function(){
            var param = this._getTplParam(),
                tpl = this.getCompiledTpl();
            return tpl(param);
        },

        _getTplParam: function(){
            return {
                cls        : this.getCls(),
                id         : this.getId(),
                outerWidth : this.getOuterWidth(),
                outerHeight: this.getOuterHeight(),
                itemWidth  : this.getItemWidth(),
                itemHeight : this.getItemHeight()
            };
        }

    });

})();
