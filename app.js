require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, './views/');
const layoutsPath = path.join(__dirname, './views/layouts/');

const exphbs = require('express-handlebars');
app.engine('hbs', 
    exphbs.engine({
        defaultLayout: 'main',
        extname: 'hbs',
        layoutsDir: layoutsPath
    }
));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(cookieParser());

app.use(
  session({
    secret: 'nhttrn84',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

const userR = require('./routes/user.r');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', userR);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
  console.log('connected');

  client.on('channel1', data => {
    io.emit('channel1', data);
  });

  client.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(port, () => console.log(`Example app listening on port ${port}!`));