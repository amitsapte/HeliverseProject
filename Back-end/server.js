const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const DataModel = require('./DataModel'); // Import the Mongoose model

const app = express();
const PORT = 5000;
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UsetData', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Endpoint for fetching paginated data
app.get('/api/data', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;
    const items = await DataModel.find().skip(skip).limit(limitNumber);
    const totalCount = await DataModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limitNumber);
console.log("data are reseve right");
    res.json({
      data: items,
      currentPage: pageNumber,
      totalPages: totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});