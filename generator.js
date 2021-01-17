const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

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
		// the editor question type allows for multiline responses, good for longer sections or markdown formatting
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
		// some questions are made optional so as to avoid unnecessary entry into the text editor
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
	{
		type: 'input',
		name: 'fileName',
		message: 'Please enter a filename. (Default is README.md)',
		default: 'README.md',
	},
];

function writeToFile(fileName, data) {
	fs.writeFile('./dist/' + fileName, data, err => {
		if (err) throw err;

		console.log(fileName + ' created successfully!');
	});
}

// TODO: Create a function to initialize app
function init() {
	// rather than creating a long promise chain, generateMarkdown() handles all user responses
	inquirer
		.prompt(questions)
		.then(answers => {
			if (!answers.fileName.includes('.md')) answers.fileName += '.md';
			writeToFile(answers.fileName, generateMarkdown(answers));
		})
		.catch(err => console.log(err));
}

// Function call to initialize app
init();
