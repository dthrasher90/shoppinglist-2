var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
console.log(jsonParser);

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
}

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
storage.add('Coffee');
storage.add('Honey');

var app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', function(request, response) {
    if (!('name' in request.body)) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});



var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("Server started in port "+port);
});

exports.app = app;
exports.storage = storage;
