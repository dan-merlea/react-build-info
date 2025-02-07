#!/usr/bin/env node

const boxen = require('boxen');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const appName = 'React Build Info';
const blankStr = '';
const buildDate = new Date(Date.now());
const inputFile = path.join(process.cwd(), 'package.json');
const outputFolder = path.join(process.cwd(), 'packages/client/src/');
const outputFile = path.join(outputFolder, 'buildInfo.js');

function outputHighlighted(highlight: string, msg: string) {
    console.log(chalk.yellow(`${highlight}: `) + msg);
}

// Opening window
console.log(boxen(appName, { padding: 1 }));
outputHighlighted('Output folder', outputFolder);
outputHighlighted('Output file', outputFile);

try {
    if (!fs.existsSync(outputFolder)) {
        console.log(chalk.red('\nError: Output folder does not exist\n'));
        process.exit(1);
    }
} catch (err) {
    console.error(err);
}

outputHighlighted('\nInput file', inputFile);
try {
    if (!fs.existsSync(inputFile)) {
        console.log(chalk.red('\nError: the package.json file does not exist\n'));
        process.exit(1);
    }
} catch (err) {
    console.error(err);
}

let rawData = fs.readFileSync(inputFile);
let packageDotJSON = JSON.parse(rawData);
let buildVersion = packageDotJSON.version;
outputHighlighted('Build version', buildVersion);
outputHighlighted('Build date', `${buildDate.toString()} (${buildDate.getTime().toString()})`);

console.log('\nWriting output file');

let outputStr = 'module.exports = {\n';
outputStr += `  buildVersion: "${buildVersion}",\n`;
outputStr += `  buildDate: ${buildDate.getTime()},\n`;
outputStr += '}';

fs.writeFile(outputFile, outputStr, function (err: any, data: any) {
    if (err) {
        console.log(chalk.red('\nError: Unable to write to file\n'));
        console.log(err);
    }
    if (data) {
        console.log(data);
    }
});
