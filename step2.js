import { readFile } from 'fs';
import axios from 'axios';

function cat(path) {
    readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR', err);
            process.kill(1);
        }
        console.log(`${data}`);
    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(`${res.data}`);
    } catch (err) {
        console.error(`Error fetching ${url}:\n  Error: Request failed with status code ${err.response.status}`);
        process.exit();
    }
}

const arg = process.argv[2];

if (!arg) {
    console.error('Please provide a file path or URL as an argument.');
} else if (arg.startsWith('http')) {
    webCat(arg);
} else {
    cat(arg);
}
