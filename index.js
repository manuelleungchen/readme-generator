// Required Modules and js files
const md = require("./utils/generateMarkdown.js");
const fs = require("fs");

// function to write README file
function writeToFile(fileName, data) {
    // const fs = require("fs");
    // const md = require('/utils/generateMarkdown.js'); 
    fs.writeFile(fileName, md.generateMarkdown(data), (err) =>
        err ? console.error(err) : console.log("Readme Created Succefully!")
    )
}

async function fetchQuestions() {
    const inquirer = require('inquirer');

    const requiredQuestions = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your full name?',
            name: 'name'
        },
        {
            type: 'input',
            message: 'What is the title of the project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is this project description?',
            name: 'description'
        },
        {
            type: 'input',
            message: 'How to use this project?',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'What is your Github?',
            name: 'github',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
        {
            type: 'list',
            message: 'What is license is this project using?',
            name: 'license',
            choices: ["MIT License", "Apache License 2.0", "Mozilla Public License 2.0", "The Unlicense"],
            loop: false
        }
    ]);

    const extraSections = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Please select any additional section for the readme:',
            name: 'extra',
            choices: ["Installation", "Contributing", "Tests", "Screenshot"],
            loop: false,
        },
    ]);

    let installation;
    let contributing;
    let tests;
    let screenshot
    if (extraSections.extra.indexOf("Installation") !== -1) {
        installation = await inquirer.prompt([
            {
                type: 'input',
                message: 'How to install this project?',
                name: 'installation'
            },
        ]);
    }

    if (extraSections.extra.indexOf("Contributing") !== -1) {
        contributing = await inquirer.prompt([
            {
                type: 'input',
                message: 'How can others contribute to this project?',
                name: 'contributing',
            },
        ]);
    }

    if (extraSections.extra.indexOf("Tests") !== -1) {
        tests = await inquirer.prompt([
            {
                type: 'input',
                message: 'How to test this project?',
                name: 'tests',
            },
        ]);
    }

    if (extraSections.extra.indexOf("Screenshot") !== -1) {
        screenshot = await inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the Relative Path of the screenshot:',
                name: 'screenshot',
            },
        ]);
    }
    
    return { ...requiredQuestions, ...installation, ...contributing, ...tests, ...screenshot};

}

// function to initialize program
function init() {
    console.log("Launching App .....");
    console.log("Welcome to README GENERATOR");
    console.log("  ");

    fetchQuestions().then((response) => {
        writeToFile("README.md", response);
    }).catch(console.error);

}

// function call to initialize program
init();
