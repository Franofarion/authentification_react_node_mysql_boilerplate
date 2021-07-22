const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

// routes
require('./routes')(app);

app.listen(port, () => {
  console.log(`server listening to http://localhost:${port}`);
});
