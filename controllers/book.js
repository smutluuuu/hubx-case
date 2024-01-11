const { validationResult } = require('express-validator');
const Book = require('../models/book');
const { urlencoded } = require('body-parser');

exports.getBook = async (req, res, next) => {
  try {
    const books = await Book.find();
    if (!book) {
      const error = new Error('There is no book to show.');
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

exports.createBook = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed,entered data is incorrect.');
    error.statusCode = 422;
    throw error;
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

exports.updateBook = async (req, res, next) => {

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

exports.deleteBook = async (req, res, next) => {
  const bookId = req.body.bookId;
  console.log(bookId);
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
