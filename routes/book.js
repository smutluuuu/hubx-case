const express = require('express');

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

router.post('/book',bookController.createBook);

/**
 * @api {delete} /book Deletes the book which bookId posted.
 * @apiGroup Book
 * @apiSuccess (200) {String} sends message "Book deleted Successfully."
 */
router.delete('/book',bookController.deleteBook);

/**
 * @api {put} /book Updates the book.
 * @apiGroup Book
 * @apiSuccess (200) {Object} Returns the updated book.
 */

router.put('/book',bookController.updateBook);

module.exports = router;
