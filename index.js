// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
	{
		type: 'input',
		name: 'projectTitle',
		message: 'Enter the title of your project. (Required)',
		validate: input => {
			if (input) return true;
			else {
				console.log('Please enter a project title.');
				return false;
			}
		},
	},
	{
		type: 'editor',
		name: 'description',
		message:
			'Enter a project description. Markdown syntax is supported. Quit editor to submit text. (Required)',
		validate: input => {
			if (input) return true;
			else {
				console.log('Please enter a description.');
				return false;
			}
		},
	},
	{
		type: 'confirm',
		name: 'installPrompt',
		default: true,
		message: 'Do you want to add installation instructions?',
	},
	{
		type: 'editor',
		name: 'install',
		message: 'Enter installation instructions. Markdown syntax is supported.',
		when: ({ installPrompt }) => {
			if (installPrompt) return true;
			else return false;
		},
	},
	{
		type: 'confirm',
		name: 'usagePrompt',
		default: true,
		message: 'Do you want to add usage information?',
	},
	{
		type: 'editor',
		name: 'usage',
		message: 'Enter usage information. Markdown syntax is supported.',
		when: ({ usagePrompt }) => {
			if (usagePrompt) return true;
			else return false;
		},
	},
	{
		type: 'input',
		name: 'contributing',
		message: 'Enter a list of contributors. Separate entries with commas.',
	},
	{
		type: 'confirm',
		name: 'testPrompt',
		default: true,
		message: 'Do you want to add testing information?',
	},
	{
		type: 'editor',
		name: 'tests',
		message:
			'Enter information regarding testing. Markdown syntax is supported.',
		when: ({ testPrompt }) => {
			if (testPrompt) return true;
			else return false;
		},
	},
	{
		type: 'list',
		name: 'license',
		message: 'Select a license.',
		choices: [
			'GNU AGPLv3',
			'GNU GPLv3',
			'GNU LGPLv3',
			'Mozilla Public License 2.0',
			'Apache License 2.0',
			'MIT License',
			'Boost Software License 1.0',
			'The Unlicense',
			'(No license)',
		],
	},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	fs.writeFile('./dist/' + fileName, data, err => {
		if (err) throw err;
	});
}

// TODO: Create a function to initialize app
function init() {
	inquirer
		.prompt(questions)
		.then(answers => writeToFile('README.md', generateMarkdown(answers)))
		.catch(err => console.log(err));
}

// Function call to initialize app
init();
