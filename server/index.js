const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { join } = require('path');
// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '../client')));
    app.use(express.static(join(__dirname, '..', 'client', 'public')));
    app.get('*', (req, res) =>
        res.sendFile(join(__dirname, '..', 'client', 'public', 'index.html'))
    );
}

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// console.log(process.env.MONGODB_CONNECTION_STRING);

// set up mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
console.log("server call");
app.use("/users", require("./routes/userRouter"));
// app.use("/profile", require("./routes/profileRouter"));
