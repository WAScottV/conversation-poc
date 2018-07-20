require('dotenv').config();
const kit = require('microservice-kit');

try {
    kit.startServer(() => console.log('Hello, world!'), 
        process.env.SPACE_ID, process.env.CMA_ACCESS_TOKEN, 'message');
}
catch (e) {
    console.log(e);
}
