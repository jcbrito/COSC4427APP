var reporters = require('jasmine-reporters');
var mongoose = require('mongoose');
require('dotenv').config();

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: 'reports',
  filePrefix: 'my-jasmine-report.json',
  consolidateAll: true  
});

jasmine.getEnv().addReporter(junitReporter);


describe('Database tests', function (){

    it('Check if the connection is good', function(){

        // arrange
        let tmp = null;

        // act
        const conn = mongoose.createConnection(process.env.dbUrl);


        // assert

        expect(conn).not.toBeNull;
    })

})


