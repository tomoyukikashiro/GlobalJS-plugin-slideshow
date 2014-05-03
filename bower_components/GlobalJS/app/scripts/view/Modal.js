(function(){
    'use strict';

    /**
     * @class Global.view.Modal
     */
    Global.define('Global.view.Modal',{

        extend: Global.core.ManipulateDomClass,

        centerd: true,

        cls: null,

        hideOnMaskClick: false,

        eventName: {
            show: 'show',
            hide: 'hide'
        },

        outerTpl: '<div class="g-modal <%= centerdCls %> <%= cls %>"></div>',
        maskTpl: '<div class="g-modal__mask <%= centerdCls %> <%= cls %>"></div>',
        tpl: [],

        $elm: null,

        compiledOuterTpl: null,
        compiledMaskTpl: null,
        compiledTpl: null,

        init: function(config) {
            this._super(config);
            this.compiledOuterTpl = this._getCompiledOuterTpl();
            this.compiledMaskTpl  = this._getCompiledMaskTpl();
            this.compiledTpl = this._getCompiledTpl();
        },

        show: function(config){
            var tplData =this._getTplData(config),
                $elm, $mask, $body;

            if(this.$elm){
                return;
            }

            this._create(tplData);
            this._setElmCaches(this.getRefs());
            this._applyEvents(this.getEvents());
            
            $elm = this.$elm;
            $mask = this.$mask;
            $body = $(document.body);

            $body.append($elm);
            $body.append($mask);

            $elm.show();
            $mask.show();

            this.dispatchEvent(this.getEventName().show);
        },

        _create: function(tplData){
            var compiledOuterTpl = this.getCompiledOuterTpl(),
                compiledMaskTpl = this.getCompiledMaskTpl(),
                compiledTpl = this.getCompiledTpl(),
                outerHtml = compiledOuterTpl(tplData),
                maskHtml = compiledMaskTpl(tplData),
                html = compiledTpl(tplData),
                $elm = $(outerHtml),
                $mask = $(maskHtml);

            $elm.append(html);
            $elm.hide();
            $mask.hide();

            this.$elm = $elm;
            this.$mask = $mask;

            if(this.getHideOnMaskClick()){
                this._bindMaskClickHide($mask);
            }else{
                this._bindMaskClickNone($mask);
            }
        },

        _bindMaskClickHide: function($mask){
            var me = this;
            $mask.on('click', function(){
                me.hide();
            });
        },

        _bindMaskClickNone: function($mask){
            $mask.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
            });
        },

        _getTplData: function(config){
            var modalTplData = this._getModalTplData();
            return $.extend(true, {}, modalTplData, config);
        },

        hide:function(){
            this.$elm.hide();
            this.$elm.remove();
            this.$mask.hide();
            this.$mask.remove();

            this.$elm = null;
            this.$mask = null;

            this.dispatchEvent(this.getEventName().hide);
        },

        _getCompiledOuterTpl: function(){
            return _.template(this.getOuterTpl());
        },

        _getCompiledMaskTpl: function(){
            return _.template(this.getMaskTpl());
        },

        _getCompiledTpl: function(){
            return _.template(this.getTpl());
        },

        _getModalTplData: function(){
            var cls = this.getCls() ? this.getCls() : '',
                centerdCls= this.getCenterd() ? 'g-modal--centerd' : '';
            return {
                'cls'       : cls,
                'centerdCls': centerdCls
            };
        }

    });
})();
