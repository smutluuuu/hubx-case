const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
let bookId
describe('GET /book', () => {
  it('should return all books', () => {
    request(app)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe('POST /book', () => {
  it('Should create a book', () => {
    request(app)
      .post('/book')
      .send({
        title: 'Deneme',
        author: {
          name: 'Deneme Yazar',
          country: 'Finlandiya',
          birthDate: '21.11.1996',
        },
        price: 1800,
        isbn: 1313131311331,
        language: 'TR',
        numberOfPages: 133,
        publisher: 'Süleyman',
      }).expect(201)
  });
});

describe('PUT /book',()=>{
    it('should update a product',()=>{
        request(app)
        .put('/book')
        .send({
            bookId:123123123123123123123123,
            title: 'Deneme',
            author: {
              name: 'Deneme Yazar',
              country: 'Finlandiya',
              birthDate: '21.11.1996',
            },
            price: 1800,
            isbn: 1313131311331,
            language: 'TR',
            numberOfPages: 133,
            publisher: 'Süleyman',
        })
        .expect(200)
    })
})

describe('DELETE /book/:bookId',()=>{
    it('Should delete a product',()=>{
        request(app)
        .delete(`/book/:${bookId}`)
        .expect(200)
    })
})

