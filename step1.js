import { readFile } from 'fs';

function cat(path) {
    readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('ERROR', err);
            process.kill(1);
        }
        console.log(`${data}`);
    });
}

const filePath = process.argv[2]; //argv1

if (!filePath) {
    console.error('Please provide a file path as an argument.');
} else {
    cat(filePath);
}
