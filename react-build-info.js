#!/usr/bin/env node
"use strict";
var boxen = require('boxen');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var appName = 'React Build Info';
var blankStr = '';
var buildDate = new Date(Date.now());
var inputFile = path.join(process.cwd(), 'package.json');
var outputFolder = path.join(process.cwd(), 'packages/client/src/');
var outputFile = path.join(outputFolder, 'buildInfo.js');
function outputHighlighted(highlight, msg) {
    console.log(chalk.yellow(highlight + ": ") + msg);
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
}
catch (err) {
    console.error(err);
}
outputHighlighted('\nInput file', inputFile);
try {
    if (!fs.existsSync(inputFile)) {
        console.log(chalk.red('\nError: the package.json file does not exist\n'));
        process.exit(1);
    }
}
catch (err) {
    console.error(err);
}
var rawData = fs.readFileSync(inputFile);
var packageDotJSON = JSON.parse(rawData);
var buildVersion = packageDotJSON.version;
outputHighlighted('Build version', buildVersion);
outputHighlighted('Build date', buildDate.toString() + " (" + buildDate.getTime().toString() + ")");
console.log('\nWriting output file');
var outputStr = 'module.exports = {\n';
outputStr += "  buildVersion: \"" + buildVersion + "\",\n";
outputStr += "  buildDate: " + buildDate.getTime() + ",\n";
outputStr += '}';
fs.writeFile(outputFile, outputStr, function (err, data) {
    if (err) {
        console.log(chalk.red('\nError: Unable to write to file\n'));
        console.log(err);
    }
    if (data) {
        console.log(data);
    }
});
