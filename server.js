// imports
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'Pusher';

//2:58

// app config
const app = express();
const port = process.env.PORT || 9000;

var pusher = new Pusher({
  appId: '1078217',
  key: '8357759f21065db0bc74',
  secret: '859ddf6512014a86d671',
  cluster: 'eu',
  encrypted: true,
});

// middleware
app.use(express.json());
// DB config
const connection_url =
  'mongodb+srv://admin:5PviHlzagY4NLOyc@cluster0.k8sh9.mongodb.net/whatsapp-clone?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('DB is connected');
});

// ???

// api route
app.get('/', (req, res) => res.status(200).send('Hello world'));

app.get('/messages/sync', (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`listening on ${port}`));

/*5PviHlzagY4NLOyc*/
