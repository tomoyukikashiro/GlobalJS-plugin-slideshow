
'use strict';

describe('Test fro math/Random.js', function () {

    var Random = Global.math.Random;

    it('instance has those public method', function () {
        expect(Random.getRandomNum).to.be.a('function');
        expect(Random.getRandomNumList).to.be.a('function');
    });

    describe('#getRandomNum', function () {
        it('should return number which smaller than passed number', function () {
            var max = 10;
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
            expect(Random.getRandomNum(max)).to.be.lessThan(max+1);
        });
    });

    describe('#getRandomNumList', function () {
        it('should return array which contain random numbers', function () {
            var max = 10,
                list1 = Random.getRandomNumList(max),
                list2 = Random.getRandomNumList(max);
            expect(list1).to.have.length(10);
            expect(list2).to.have.length(10);
        });
    });
});
