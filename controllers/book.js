const { validationResult } = require('express-validator');
const Book = require('../models/book');
const { urlencoded } = require('body-parser');

/**
 * Gets book items
 * @returns {{books:Array,message:String}} the books
 */

exports.getBook = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      const error = new Error('There are no book to show.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Books fetched successfully.',
      books: books,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Create a book item
 *
 * @param {object} author the author object
 * @param {string} author.name  the author object's name
 * @param {string} author.country  the author object's country
 * @param {string} author.birthDate  the author object's birth date
 * @param {string} title the title of book
 * @param {string} price the price of book
 * @param {string} isbn the isbn of book
 * @param {string} language the language of book
 * @param {string} numberOfPages the total page number of book
 * @param {string} publisher the publisher of book
 * @returns {{author:{name:String,country:String,birthDate:String},title:String,price:Number,isbn:Number,language:String,numberOfPages:Number,publisher:String,_id:ObjectId}} the created book.
 */

exports.createBook = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors.array(),
    });
    return
  }

  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const isbn = req.body.isbn;
  const language = req.body.language;
  const numberOfPages = req.body.numberOfPages;
  const publisher = req.body.publisher;

  const book = new Book({
    title: title,
    author: author,
    price: price,
    isbn: isbn,
    language: language,
    numberOfPages: numberOfPages,
    publisher: publisher,
  });

  try {
    await book.save();
    res.status(201).json({
      message: 'Book created successfully.',
      book: book,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Update a book item
 * @param {Id} bookId the book ID
 * @param {object} author the author object
 * @param {string} author.name  the author object's name
 * @param {string} author.country  the author object's country
 * @param {string} author.birthDate  the author object's birth date
 * @param {string} title the title of book
 * @param {string} price the price of book
 * @param {string} isbn the isbn of book
 * @param {string} language the language of book
 * @param {string} numberOfPages the total page number of book
 * @param {string} publisher the publisher of book
 * @returns {{author:{name:String,country:String,birthDate:String},message:String,title:String,price:Number,isbn:Number,language:String,numberOfPages:Number,publisher:String,bookId:ObjectId}} the updated book.
 */

exports.updateBook = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   res.status(400).json({
      error: errors.array()
    });
    return
  }

  const bookId = req.body.bookId;
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  const isbn = req.body.isbn;
  const language = req.body.language;
  const numberOfPages = req.body.numberOfPages;
  const publisher = req.body.publisher;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error('Could not find book.');
      error.statusCode = 404;
      throw error;
    }

    book.title = title;
    book.author = author;
    book.price = price;
    book.isbn = isbn;
    book.language = language;
    book.numberOfPages = numberOfPages;
    book.publisher = publisher;
    const result = await book.save();

    res.status(200).json({
      message: 'Book is updated!',
      book: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * Delete a book item
 * @param {Id} bookId the book ID
 * @returns {String} message "Book deleted Successfully."
 */

exports.deleteBook = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   res.status(400).json({
      error: errors.array()
    });
    return
  }

  const bookId = req.query.bookId;
  
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      const error = new Error('Could not find book.');
      error.statusCode = 404;
      throw error;
    }
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      message: 'Book deleted Successfully.',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
