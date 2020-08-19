var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



var dbUrl = 'mongodb://jbrito:Z3-nedation@learning-node-shard-00-00-9we9w.mongodb.net:27017,learning-node-shard-00-01-9we9w.mongodb.net:27017,learning-node-shard-00-02-9we9w.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Learning-Node-shard-0&authSource=admin&retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body)

    message.save((err) => {
        if (err)
            sendStatus(500)

        io.emit('message', req.body)
        res.sendStatus(200)
    })

})

io.on('connection', (socket) => {
    console.log('a user connected')
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(8080, () => {
    console.log('server is listening on port', server.address().port)
})