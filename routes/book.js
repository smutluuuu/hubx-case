const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

//GET /book/books
router.get('/books', bookController.getBook);

//POST /book/book
router.post('/book',bookController.createBook);

//Delete /book/book
router.delete('/book',bookController.deleteBook);

router.put('/book',bookController.updateBook);

module.exports = router;
