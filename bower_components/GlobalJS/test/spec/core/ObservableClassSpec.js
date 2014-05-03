
'use strict';

describe('Test for core/ObservableClass.js', function () {

    var EventDispatcher = Global.event.EventDispatcher,
        ObservableClass = Global.core.ObservableClass;

    it('class is defined extended EventDispatcher', function () {
        expect(ObservableClass.$parentClass.$className).to.eql(EventDispatcher.$className);
    });

    it('core/ObservableClass is registed alias name space', function () {
        expect(Global.ObservableClass).to.eql(ObservableClass);
    });

});
