const express = require('express');
const { body, check } = require('express-validator');

const router = express.Router();

const bookController = require('../controllers/book');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author.name
 *         - author.country
 *         - author.birthDate
 *         - price
 *         - isbn
 *         - language
 *         - numberOfPages
 *         - publisher
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: Object
 *           description: The book author
 *         author.name:
 *           type: String
 *           description: The author's name
 *         author.country:
 *           type: String
 *           description: The author's country
 *         author.birthDate:
 *           type: Date
 *           description: The author's birthday date
 *         price:
 *            type: Number
 *            description: Price of book
 *         isbn:
 *             type: Number
 *             description: ISBN number of book
 *         language:
 *             type: String
 *             description: Language of book
 *         numberOfPages:
 *             type: Number
 *             description: Page number of book
 *         publisher:
 *             type: String
 *             description: Publisher name of book
 *       example:
 *         bookId: "123456718234234231234234"
 *         title: The New Turing Omnibus
 *         author: {
 *             "name":AlexanderDewdney","country":"Tr","birthDate":"2024-01-14T13:19:16.052Z"}
 *         price: 233
 *         isbn: 1111132323232
 *         language: Turkish
 *         numberOfPages: 233
 *         publisher: Publish House
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

router.get('/books', bookController.getBook);

/**
 * @api {post} /book Create a Book
 * @apiGroup Book
 * @apiSuccess (201) {Object} data the created book
 */

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       400:
 *         description: The book was not created
 */

router.post(
  '/book',
  [
    body('author.name').isString().trim().notEmpty().withMessage('Required field.'),
    body('author.country').isString().trim().notEmpty().withMessage('Required field.'),
    body('author.birthDate').isISO8601().toDate().withMessage('Invalid date recieved').notEmpty().withMessage('Required field.'),
    body('title').isString().trim().notEmpty().withMessage('Required field.'),
    body('price').isNumeric().isInt().notEmpty().withMessage('Required field.'),
    body('isbn')
      .isNumeric()
      .isLength({ min: 13, max: 13 })
      .withMessage('Must be 13 characters'),
    body('language')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Required field.'),
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

/**
 * @swagger
 * /book:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: Book deleted Successfully.
 *       404:
 *         description: Could not find book.
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

/**
 * @swagger
 * /book:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Book]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: Book is updated!
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *              message:
 *                  type: string
 *                  description:
 *      404:
 *        description: Couldnt find book
 *      400:
 *         description: Bad request
 *      500:
 *        description: Some error happened
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

/**
 * @api {get} /books Get all Books
 * @apiGroup Book
 * @apiSuccess (200) {Object} data the created books
 */
