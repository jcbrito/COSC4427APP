var reporters = require('jasmine-reporters');
require('dotenv').config();
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.DBURL);

var junitReporter = new reporters.JUnitXmlReporter({
  savePath: 'reports',
  filePrefix: 'my-jasmine-report.json',
  consolidateAll: true  
});

jasmine.getEnv().addReporter(junitReporter);

async function listDatabases(client){

  try{
      await client.connect();
      databasesList = await  client.db().admin().listDatabases();   
  
      return databasesList == null;
  }
  
  catch(e){
      return true;
  }

  finally{
      client.close();
  }
};


function testConnection(){
  try{

    client.connect();
    return true;
  }
  catch(e){

    return false;
  }

  finally{

    client.close();
  }
}



describe('Database tests', function (){

    it('Check if the connection is good', function(){

        // arrange
       
        let bool = false;

        // act

       bool = testConnection();

       // assert

       expect(bool).toBeTrue();

    })

    it('The connection is good, list databases', async function(){

     // arrange

     let bool = true;

     // act
      bool = await listDatabases(client);

     // assert

     expect(bool).toBeFalse();
    

    })

  
})


