(function(){
    'use strict';
    /**
     * @class Global.util.SpriteSheet
     * iterate css class at specific interval
     * @extends Global.core.BaseClass
     */
    Global.define('Global.util.SpriteSheet',{

        extend : Global.core.ObservableClass,

        classList: [],

        interval : 500,

        eventName: {
            end: 'end',
            change: 'change'
        },

        targetSelector: null,

        $elm: null,

        totalCount: 0,

        limit: null,

        count: 0,

        intervalId: null,

        init: function(config){
            this.listeners = {};
            this.$elm = $(config.targetSelector);
            this._super(config);
        },

        execute: function(){
            var me = this;
            me.intervalId = setInterval(function(){
                me.doSprite(me.count);
                me.countUp(me.count);
                me.dispatchEvent(me.getEventName().change, me.getTotalCount());
                if(Global.isNumber(me.getLimit()) && me.getTotalCount() === me.getLimit()){
                    window.clearInterval(me.intervalId);
                    me.setTotalCount(0);
                    me.dispatchEvent(me.getEventName().end);
                }
            }, me.interval);
        },

        doSprite: function(count){
            var me = this,
                cls = me.getClass(count);
            me.$elm.removeClass(cls.current);
            me.$elm.addClass(cls.next);
        },

        countUp: function(count){
            this.count = (1+count) % this.classList.length;
            this.totalCount = ++this.totalCount;
        },

        getClass: function(count){
            var me = this,
                nextIndex = count+1,
                _nextIndex = nextIndex === this.classList.length ? 0 : nextIndex,
                current = me.classList[count],
                next    = me.classList[_nextIndex];
            return {
                current: current,
                next   : next
            };
        }
    });
})();
