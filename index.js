import express from 'express';
import * as data from './data/mock.json' assert { type: 'json' };

const app = express();

const PORT = 3001;

/**
 * The express.static() middleware function takes a directory path as an argument and 
 * returns a function that can be used as middleware in your Express.js application.
 */
app.use(express.static("public"));

// Using the images folder at the route /images
app.use('/images', express.static("images"));

// Using express.json() and express.urlencoded()
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET
app.get('/', (request, response) => {
    response.json(data)
});

// POST - express.json and express.urlencoded
app.post('/item', (request, response) => {
    console.log(request.body);
    response.send(request.body);
});

app.get('/download', (request, response) => {
    response.download('images/mountain_1.jpeg');
});

app.get('/redirect', (request, response) => {
    response.redirect('https://www.linkedin.com');
});

// GET with next()
app.get('/next', (request, response, next) => {
    console.log('The request will be sent by the next function.');
    next();
}, (request, response) => {
    response.send("I just set up a route with a second callback");
});

app
    .route('/class')
    .get((request, response) => {
        throw new Error('This is error in line 52');
    })

// GET with Routing Parameters
app.get('/class/:id', (request, response) => {
    const studentId = +request.params.id;
    const student = data.filter(({ id }) => id === studentId);
    console.log(student);
    response.send(student);
});

// POST
app.post('/create', (request, response) => {
    response.send('This is a message from server, POST at /create')
})

app.post('/item', (request, response) => {
    const { body } = request;
    response.send(body);
})

// PUT
app.put('/update', (request, response) => {
    response.send('This is a message from server, PUT at /update')
})

// DELETE
app.delete('/delete', (request, response) => {
    response.send('This is a message from server, PUT at /delete')
})

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('Something is broken')
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
