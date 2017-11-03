var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var topics = ["Spoons are useless.", "Ice cream shaped like spaghetti is actually appetizing.",
    "A vampire would beat a basilisk in a fight.", "Platypus are adorable.",
    "Trees could one day be sentient.", "Catnip should be illegal for cats.", "Cats are better than dogs.", "Breakfast cereal should be classified as soup.",
    "Beards should be allowed on campus.", "Astros are better than Dodgers.", "Pizza is good with pineapple.", "Cheese is the greatest food in the world.",
    "Pirates are better than ninjas", "BYU Dating culture is amazing!", "Marvel is better than DC", "Electrical Engineering is better than Mechanical Engineering"
];

var todaysTopic = topics[Math.floor(Math.random() * topics.length)]



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/topic', function(req, res) {
    res.send(todaysTopic);
})

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('chat message-left', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message-left', msg);
    });
    socket.on('chat message-right', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message-right', msg);
    });

});

var changeTopic = function() {
    todaysTopic = topics[Math.floor(Math.random() * topics.length)];
    io.emit('new topic');
    console.log('New topic');
}
setInterval(changeTopic, 90000);

http.listen(3000, function() {
    console.log('listening on *:3000');
});