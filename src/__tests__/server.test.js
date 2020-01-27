'use strict';

const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('middleware function module test', () => {

    it('response a 500 on error', () => {
        return mockRequest
            .get('/real-error')
            .then(data => {
                expect(data.status).toBe(500);
            }).catch(console.error);
    });
    it('response a 404 for not founding route', () => {
        return mockRequest
            .get('/helo-there')
            .then(data => {
                expect(data.status).toBe(404);
            }).catch(console.error);
    });
    it('response a 404 for not founding route', () => {
        return mockRequest
            .get('/route-does not exist')
            .then(data => {
                expect(data.status).toBe(404);
            })
    });
});
describe('API Route Module for categories', () => {
    it('respond properly to a get request to /api/v1/categories', () => {
        return mockRequest
            .get('/api/v1/categories')
            .then(results => {
                expect(results.status).toBe(200);
                // console.log('************************', results.body);
                expect(typeof results.body.resultsCatg).toBe('object');
            });
    });
    it('respond properly to a post request to /api/v1/categories', () => {
        return mockRequest
            .post('/api/v1/categories')
            .send({ name: 'tast 1' })
            .then(data => {
                // console.log(data.body)
                expect(data.status).toBe(201);
                expect(data.body.name).toEqual('tast 1');
                expect(data.body).toBeDefined();
            })
    });
    it('respond properly to a delete request to /api/v1/categories/:id', () => {
        return mockRequest
            .post('/api/v1/categories')
            .send({ name: 'tast 1' })
            .then(data => {
                return mockRequest
                    .delete(`/api/v1/categories/:${data.body.id}`)
                    .then(results => {
                        // console.log('************************', results.body);
                        expect(results.status).toBe(200);
                        expect(results.body.name).toBeUndefined();
                        expect(results.body.id).toBeUndefined();
                        expect(results.body.msg).toEqual('item deleted');
                    });
            })
    });
    it('respond properly to a put request to /api/v1/categories/:id', () => {
        return mockRequest
            .post('/api/v1/categories')
            .send({ name: 'tast 1' })
            .then(data => {
                return mockRequest
                    .put(`/api/v1/categories/:${data.body.id}`)
                    .then(results => {
                        results.body.name = 'name is updated';
                        results.body.id = 3;
                        // console.log('************************', results.body);
                        expect(results.status).toBe(200);
                        expect(typeof results.body).toBe('object');
                        expect(results.body.name).toEqual('name is updated');
                        expect(results.body.id).toEqual(3);
                    })
            });
    })
});

    describe('API Route Module for products', () => {

    it('respond properly to a get request to /api/v1/products', () => {
        return mockRequest
            .get('/api/v1/products')
            .then(results => {
                expect(results.status).toBe(200);
                // console.log('************************', results.body);
                expect(typeof results.body.resultsProd).toBe('object');
            });
    });
    it('respond properly to a post request to /api/v1/categories', () => {
        return mockRequest
            .post('/api/v1/categories')
            .send({ name: 'tast products 1' })
            .then(data => {
                // console.log(data.body)
                expect(data.status).toBe(201);
                expect(data.body.name).toEqual('tast products 1');
                expect(data.body).toBeDefined();
                expect(typeof data.body.id).toBe('number');
            })
    });
it('respond properly to a delete request to /api/v1/products/:id', () => {
    return mockRequest
        .post('/api/v1/products')
        .send({ name: 'tast products 1' })
        .then(data => {
            return mockRequest
                .delete(`/api/v1/products/:${data.body.id}`)
                .then(results => {
                    // console.log('************************', results.body);
                    expect(results.status).toBe(200);
                    expect(results.body.name).toBeUndefined();
                    expect(results.body.id).toBeUndefined();
                    expect(results.body.msgProd).toEqual('item deleted');
                });
        })
});
it('respond properly to a put request to /api/v1/products/:id', () => {
    return mockRequest
        .post('/api/v1/products')
        .send({ name: 'tast products 1' })
        .then(data => {
            return mockRequest
                .put(`/api/v1/products/:${data.body.id}`)
                .then(results => {
                    results.body.name = 'name is updated';
                    results.body.id = 5;
                    // console.log('************************', results.body);
                    expect(results.status).toBe(200);
                    expect(typeof results.body).toBe('object');
                    expect(results.body.name).toEqual('name is updated');
                    expect(results.body.id).toEqual(5);
                });
        });
});
});
