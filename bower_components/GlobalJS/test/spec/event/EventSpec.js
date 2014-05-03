
'use strict';

describe('Test for event/Event.js', function () {

    var instance = new Global.event.Event({});

    it('instance has those properties', function () {
        expect(instance).to.have.key('target');
        expect(instance).to.have.key('type');
        expect(instance).to.have.key('data');
    });

});
