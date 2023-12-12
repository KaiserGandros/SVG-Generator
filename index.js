const inquirer = require('inquirer');
const fs = require('node:fs');
const shapes = require('./lib/shapes');

const questions = [
    {
        type: 'input',
        message: 'Enter up to three characters for the logo.',
        name: 'text',
        validate: input => input.length <= 3 && input.length >0 ? true : 'Please enter a up to three characters.'
    },
    {
        type: 'input',
        message: 'What will the color of the characters be? Use keyword or hexadecimal number.',
        name: 'textColor',
    },
    {
        type: 'list',
        message: 'Choose a shape for the logo. ',
        name: 'shape',
        choices: [
            'Circle',
            'Square',
            'Triangle'
        ]
    },
    {
        type: 'input',
        message: 'What is the color of the shape? Use keyword or hexadecimal number.',
        name: 'shapeColor',
    },
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if(err) throw err
        
        console.log ('logo.svg has been generated!');
    });
};


function init() {
    inquirer.prompt(questions).then(answers => {
        const svgContent = shapes.generateSVG(answers);
        console.log(svgContent);
        writeToFile('logo.svg', svgContent)
    });
};


init();
