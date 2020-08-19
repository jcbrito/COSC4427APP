var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
  consolidateAll: true
});

jasmine.getEnv().addReporter(junitReporter);

function getOpposite(bool){
    return !bool;
}

function add(x, y){
    return x + y;
}

function sub(x, y){
    return x - y;
}


describe('Tests', () =>{
    it('Gets the opposite boolean value', () => {

        // arrange
        let bool = false;

        // act
        const result = getOpposite(bool);

        // assert
        expect(result).toBe(true);

    })

})