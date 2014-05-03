
'use strict';

describe('Test for data/Map.js', function () {

    var Map = Global.data.Map;

    it('class has those public method', function () {
        expect(Map.list2Map).to.be.a('function');
    });

    describe('#list2Map', function () {
        it('make list by using key you passed', function () {
            var list = [
                    {test: 'test-1', id: '1'},
                    {test: 'test-2', id: '2'},
                    {test: 'test-3', id: '3'},
                    {test: 'test-4', id: '4'},
                    {test: 'test-5', id: '5'}
                ],
                res = {
                    '1': {test: 'test-1', id: '1'},
                    '2': {test: 'test-2', id: '2'},
                    '3': {test: 'test-3', id: '3'},
                    '4': {test: 'test-4', id: '4'},
                    '5': {test: 'test-5', id: '5'}
                };
            expect(Map.list2Map(list, 'id')).to.eql(res);

        });
    });

});
