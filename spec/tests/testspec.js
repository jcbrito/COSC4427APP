var reporters = require('jasmine-reporters');

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: 'reports',
  filePrefix: 'my-jasmine-report.json',
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

    it('Get the sum of X and Y', () => {

        // arrange
        let num1 = 5;
        let num2 = 3;

        // act
        const result = add(num1, num2);

        // assert
        expect(result).toBe(8);
    })

    it('get the difference of two numbers', () =>{

        // arrange
        let num1 = 5;
        let num2 = 4;

        // act
        const result = sub(num1, num2);

        // assert
        expect(result).toBe(1);
    })
})