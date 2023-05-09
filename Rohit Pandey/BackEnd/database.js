const mongoose = require('mongoose');

// Database connection 
mongoose.connect('mongodb://localhost:27017/MentorStudents', {
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(err));


//Creating company schema
const companySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  url: {
    type: String,
    default: null
  }
});


//Creating ad schema
const adSchema = new mongoose.Schema({
  companyId: {
    type: Number,
    ref: 'Company',
    default: null
  },
  primaryText: {
    type: String,
    default: null
  },
  headline: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  CTA: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  }
});


//Creating company model
const Company = new mongoose.model('Company', companySchema);

//Creating ad model
const Ad = new mongoose.model('Ad', adSchema);

module.exports = {
  Company,
  Ad
};