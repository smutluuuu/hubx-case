const express = require('express');
const { body, check } = require('express-validator');

const router = express.Router();

const bookController = require('../controllers/book');

/**
 * @api {get} /books Get all Books
 * @apiGroup Book
 * @apiSuccess (200) {Object} data the created books
 */
router.get('/books', bookController.getBook);

/**
 * @api {post} /book Create a Book
 * @apiGroup Book
 * @apiSuccess (201) {Object} data the created book
 */

router.post(
  '/book',
  [
    body('author.name').trim().notEmpty().withMessage('Required field.'),
    body('author.country').trim().notEmpty().withMessage('Required field.'),
    body('author.birthDate').trim().notEmpty().withMessage('Required field.'),
    body('title').trim().notEmpty().withMessage('Required field.'),
    body('price').isNumeric().notEmpty().withMessage('Required field.'),
    body('isbn')
      .isNumeric()
      .isLength({ min: 13, max: 13 })
      .withMessage('Must be 13 characters'),
    body('language').trim().notEmpty().withMessage('Required field.'),
    body('numberOfPages')
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage('Required field.'),
    body('publisher').trim().notEmpty().withMessage('Required field.'),
  ],
  bookController.createBook
);

/**
 * @api {delete} /book Deletes the book which bookId posted.
 * @apiGroup Book
 * @apiSuccess (200) {String} sends message "Book deleted Successfully."
 */
router.delete(
  '/book',
  check('bookId')
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage('Must be 24 characters'),
  bookController.deleteBook
);

/**
 * @api {put} /book Updates the book.
 * @apiGroup Book
 * @apiSuccess (200) {Object} Returns the updated book.
 */

router.put(
  '/book',
  body('bookId')
    .trim()
    .isLength({ min: 24, max: 24 })
    .withMessage('Must be 24 characters'),
  body('author.name').trim().notEmpty().withMessage('Required field.'),
  body('author.country').trim().notEmpty().withMessage('Required field.'),
  body('author.birthDate').trim().notEmpty().withMessage('Required field.'),
  body('title').trim().notEmpty().withMessage('Required field.'),
  body('price').isNumeric().notEmpty(),
  body('isbn')
    .isNumeric()
    .isLength({ min: 13, max: 13 })
    .withMessage('Must be 13 characters'),
  body('language').trim().notEmpty().withMessage('Required field.'),
  body('numberOfPages')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Required field.'),
  body('publisher').trim().notEmpty().withMessage('Required field.'),
  bookController.updateBook
);

module.exports = router;
