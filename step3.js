import { readFile, writeFile } from 'fs/promises';
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

async function copyCat(outputFile, sourceFile) {
    try {
        let data;
        if (sourceFile.startsWith('http')) {
            const res = await axios.get(sourceFile);
            data = res.data;
        } else {
            data = await readFile(sourceFile, 'utf8');
        }
        await writeFile(outputFile, data, 'utf8');
        console.log(`Successfully copied ${sourceFile} to ${outputFile}`);
    } catch (err) {
        console.error(`Error: ${err}`);
        process.exit();
    }
}

const arg = process.argv[2];
const outputFile = process.argv[3];
const sourceFile = process.argv[4];

if (!arg) {
    console.error('Please provide a file path or URL as an argument.');
} else if (arg.startsWith('http')) {
    webCat(arg);
} else if (arg == '--out' && outputFile && sourceFile) {
    copyCat(outputFile, sourceFile);
} else {
    cat(arg);
}
