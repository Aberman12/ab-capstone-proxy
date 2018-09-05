var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var helmet = require('helmet');
var path = require('path')

var proxy = express();
var port = 3002;
proxy.use(helmet());
proxy.use(bodyParser.json());
proxy.use(bodyParser.urlencoded({extended:true}));
proxy.use(express.static(path.join(__dirname, '../')));

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

proxy.use('/items', (req, res) => {
  request(
    'http://localhost:3001/items', 
    (error, response, body) => {
      if(response.statusCode === 200) {
        res.status(200).send(body);
      }
    }
  )
})

proxy.use('/api/pageDetails/data', (req, res) => {
  request('http://localhost:3018/api/pageDetails/data', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
proxy.use('/api/amenities', (req, res) => {
  request('http://localhost:3012/api/amenities', (error, response, body) => {
    if(error){
      console.log('error in index.js', error)
    }
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
proxy.use('/api/rooms/1', (req, res) => {
  request('http://localhost:9001/api/rooms/1', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})

proxy.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

