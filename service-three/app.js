require('dotenv').config();
const kit = require('microservice-kit');

try {
    kit.startServer(() => console.log('Request Processed.'), 
        process.env.SPACE_ID, process.env.CMA_ACCESS_TOKEN, 'stepthree');
}
catch (e) {
    console.log(e);
}
