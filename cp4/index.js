var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var topics = ["Spoons are useless.", "Ice cream shaped like spaghetti is actually appetizing.",
    "A vampire would beat a basilisk in a fight.", "Platypus are adorable.", "Trees could one day be sentient.", "Catnip should be illegal for cats.", "Cats are better than dogs.", "Beards should be allowed on campus.", "Astros are better than Dodgers.", "Pizza is good with pineapple.", "Cheese is the greatest food in the world.", "Pirates are better than ninjas.", "BYU Dating culture is amazing!", "Marvel is better than DC.", "Electrical Engineering is better than Mechanical Engineering.", "Is cereal milk soup?", "Harry Potter is better than Hunger Games.", "Winter is better than summer.", "Netflix is better than Hulu.", "The power of Flight is better than invisibility.", "Mountains are better than beaches.", "Console gaming is better than pc gaming.", "UFOs are not a hoax.", "Cheeseburgers are better than hamburgers.", "Red is better than blue.", "Comedy movies are better than scary movies.", "Funny pick-up lines work.", "The morning is better than nighttime.", "The thumb is a finger.", "The Illuminati is real.", "Microsoft is better than Apple.", "Is tomato a fruit?", "Pepsi is better than Coke.", "Link is better than Mario.", "NASA is taking volunteers for a one-way trip to colonize the Mars. Do you go?", "Pancakes are better than waffles.", "Dabbing should be banned.", "Gryffindor is better than Slytherin.", "Hufflepuff is better than Ravenclaw.", "You cut your sandwiches into triangles instead of rectangles.", "Hot pizza is better than cold pizza.", "Should Trix stop its discrimination and make them for everyone?", "Chrome is better than Edge.", "Teachers should be required to provide study guides for exams.", "Don't procrastinate."
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
setInterval(changeTopic, 180000);

http.listen(3000, function() {
    console.log('listening on *:3000');
});