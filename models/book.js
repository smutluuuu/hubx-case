const { default: mongoose } = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    name:{type: String},
    country:{type: String},
    birthDate:{type: String}
  },
  price: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('Book', bookSchema);
