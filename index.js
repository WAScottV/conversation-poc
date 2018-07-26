const readline = require('readline');
const axios = require('axios');
const dataObj = require('./testing/post')();

axios.defaults.headers.post['Content-Type'] = 'application/json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('How can I help you today?', async answer => {
    dataObj.classifier.topclass = answer;
    let x = await callNext('http://localhost:3000', dataObj);
    console.log(x);
    // axios.post('http://localhost:3000', dataObj)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data.response.machine, undefined, 2));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    rl.close();
});

const callNext = async (url, data) => {
    if (url === undefined || url === null) return;
    const response = await axios.post(url, data);
    return parseResponse(response);
};

const parseResponse = (body) => {
    return {
        text: body.data.response.reply,
        next: body.data.response.machine
    }
};