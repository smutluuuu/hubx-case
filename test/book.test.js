const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require('dotenv').config();

let bookId;

describe('GET /books', () => {
  it('Should return all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    console.log(res.text);
  });
});

describe('Post product route', () => {
  it('Should return a 201', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        title: 'Deneme',
        author: {
          name: 'Deneme Yazar',
          country: 'Finlandiya',
          birthDate: '2323',
        },
        price: 1800,
        isbn: 1313131311331,
        language: 'TR',
        numberOfPages: 133,
        publisher: 'Süleyman',
      })
      .expect(201)
      .then((res) => {
        console.log(res.body.book._id);
        bookId = res.body.book._id;
      });
  });
});

describe('Post product route', () => {
  it('Should return a 404', async () => {
    await request(app)
      .post('/book')
      .send({
        author: {
          name: 'Deneme Yazar',
          country: 'Finlandiya',
          birthDate: '2024-01-14T13:19:16.052Z',
        },
        price: 1800,
        isbn: 1313131311331,
        language: 'TR',
        numberOfPages: 133,
        publisher: 'Süleyman',
      })
      .expect(400);
  });
});

describe('PUT /book', () => {
  it('should update a product', async () => {
    await request(app)
      .put('/book')
      .send({
        bookId: bookId,
        title: 'Deneme',
        author: {
          name: 'Deneme Yazar',
          country: 'Finlandiya',
          birthDate: '2024-01-14T13:19:16.052Z',
        },
        price: 1800,
        isbn: 1313131311331,
        language: 'TR',
        numberOfPages: 133,
        publisher: 'Süleyman',
      })
      .expect(200);
  });
});

describe('DELETE /book/:bookId', () => {
  it('Should delete a product', async () => {
    const res = await request(app)
      .delete(`/book?bookId=${bookId}`)
      expect(res.statusCode).toBe(200);
     
  });
});
