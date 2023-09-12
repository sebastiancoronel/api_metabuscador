const request = require('supertest');
let app = require('./app');

beforeAll(() => {
    server = app.listen(3001, () => {
        console.log('Server is running on port 3001'); // Opcional: para verificar que el servidor se inicia
    });
});

afterAll(done => {
    server.close(done);
});

describe('SeekCrawler API',() => {

    it('GET jobs', () => {
        return request(app)
        .get('/jobs')
        .expect('Content-type',/json/)
        .expect(200)
        .then( response => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        titulo: expect.any(String)
                    })
                ])
            )
        } )
        
    });

    it('Post a new user',() => {
        return request(app)
        .post('/users')
        .send({
            email: 'example_user@example.com',
            password: '123456789'
        })
        .expect('Content-type',/json/)
        .expect(200)
        .then( response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    email: 'example_user@example.com',
                    password: '123456789'
                })
            )
        });
        
    });

    it('Get all users',() => {
        return request(app)
        .get('/users')
        .expect(200)
        .expect('Content-type', /json/)
        .then(response => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        email: expect.any(String), 
                        password: expect.any(String)
                    })
                ])
            )
        })
    });

    it('Get specific user',()=>{
        return request(app)
        .get('/users/1')
        .expect(200)
        .expect('Content-type', /json/)
        .then(response =>{
            expect.arrayContaining([
                expect.objectContaining({
                    id:'1',
                    email: 'test@gmail.com'
                })
            ])
        })
    });

    it('Return error on unespected user',()=>{
        return request(app)
        .get('/9999999999')
        .expect(404);
    });

    it('Should return 422 for wrong user input',()=>{
        return request(app)
        .post('/users').send({
            email:''
        }).expect(422);
    })

});