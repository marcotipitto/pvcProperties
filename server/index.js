const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/dev');
const { provideMongoErrorHandler } = require('./middlewares');

// Routes
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');
const imageRoutes = require('./routes/image-upload');

const { onlyAuthUser } = require('./controllers/users');

// Models
require('./models/rental');
require('./models/user');
require('./models/cloudinary-image');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => {
    console.log('Connected to DB')
});

// Middleware
app.use(bodyParser.json());
app.use(provideMongoErrorHandler);

app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  const user = res.locals.user
  return res.json({message: `Super secret message for: ${user.username} `})
})

// Api Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/image-upload', imageRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});