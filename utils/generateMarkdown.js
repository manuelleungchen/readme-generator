// function to generate markdown for README
function generateMarkdown(data) {
    console.log(data);
    let licenseCode = "";
    let licenseBadge = "";

    switch (data.license) {
        case "MIT License":
            licenseCode = "mit";
            licenseBadge = "mit";
            break;
        case "Apache License 2.0":
            licenseCode = "apache-2.0";
            licenseBadge = "Apache%202.0";
            break;
        case "Mozilla Public License 2.0":
            licenseCode = "mpl-2.0";
            licenseBadge = "MPL%202.0";
            break;
        case "The Unlicense":
            licenseCode = "unlicense";
            licenseBadge = "Unlicense";
            break;
    }

    let instSteps = "";
    if ("installation" in data === true && data.installation !== "") {
        // Split the Installation input into separate steps
        let instArray = data.installation.split(". ");
        instSteps = "## Installation\n";
        for (let counter = 1; counter <= instArray.length; counter++) {
            instSteps += `${counter}. ${instArray[counter - 1]}\n`;
        }
    }

    // Split the Usage input into separate steps
    let usageArray = data.usage.split(". ");
    let usageSteps = "";
    for (let counter = 1; counter <= usageArray.length; counter++) {
        usageSteps += `* ${usageArray[counter - 1]}\n`;
    }

    // Add the Contributing Section
    let contributing = "";
    if ("contributing" in data === true && data.contributing !== "") {
        contributing = "## Contributing\n";
        contributing += `${data.contributing}`
    }

    // Add the Tests Section
    let tests = "";
    if ("tests" in data === true && data.tests !== "") {
        tests = "## Tests\n";
        tests += `${data.tests}`
    }

    // Add the Screenshot image to the Description section
    let screenshot = "";
    if ("screenshot" in data === true && data.tests !== "") {
        screenshot = `![Screenshot](${data.screenshot})\n`
    }

    // Add the extra headings to the Table of Contents
    let installationHeading = "";
    if ("installation" in data === true && data.installation !== "") {
        installationHeading = "* [Installation](#installation)";
    }

    let contributingHeading = "";
    if ("contributing" in data === true && data.contributing !== "") {
        contributingHeading = "* [Contributing](#contributing)";
    }

    let testsHeading = "";
    if ("tests" in data === true && data.tests !== "") {
        testsHeading = "* [Tests](#tests)";
    }

    let textToWrite = `
    
# ${data.title}
![License](https://img.shields.io/badge/License%3A-${licenseBadge}-darkgreen.svg)

## Description  
${data.description}\n
${screenshot}
    
## Table of Contents   
${installationHeading}
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
${contributingHeading}
${testsHeading}
* [Questions](#questions)

${instSteps}    
    
## Usage    
${usageSteps}    
    
## Credits  
${data.name} [GitHub](https://github.com/${data.github})

## License
Copyright \(c\) 2020 - ${data.name}

Licensed under the [${data.license}](https://choosealicense.com/licenses/${licenseCode}/).
 
${contributing}

${tests}  

## Questions
${data.name} - [GitHub](https://github.com/${data.github} )

If you have any question about this application, please reach out me by [Email](${data.email})

`;

    return textToWrite;
}

module.exports = {
    generateMarkdown
};
