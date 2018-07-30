const readline = require('readline');
const axios = require('axios');
const dataObj = require('./testing/post')();

const rootService = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let prompt = 'Start conversation here:';

// Flow control variables.
let nextUrl = rootService;
let exit = false;

const callNext = async (url, data) => {
    if (url === undefined || url === null) return;
    const response = await axios.post(url, data);
    parseResponse(response);
};

// for now, use the 'machine' property on object to determine
// url of next service.
const parseResponse = (body) => {
    prompt = body.data.response.reply.pop()['msg'];
    nextUrl = body.data.response.machine;
};

const main = () => {
    rl.question(JSON.stringify(prompt, undefined, 2) + '\n\n', async answer => {
        dataObj.classifier.topclass = answer;
        await callNext(nextUrl, dataObj);
        if (nextUrl === undefined || nextUrl === null) {
            rl.close();
            console.log(prompt);
            return;
        }
        main();
    });
};

main();