// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
// TODO: Create an array of questions for user input
const questions = [
	{
		type: "input",
		name: "project_title",
		message: "Enter the title of your project. (Required)",
		validate: input => {
			if (input) return true;
			else {
				console.log("Please enter a project title.");
				return false;
			}
		},
	},
	{
		type: "input",
		name: "description",
		message: "Enter a project description. (Required)",
		validate: input => {
			if (input) return true;
			else {
				console.log("Please enter a project title.");
				return false;
			}
		},
	},
	{
		type: "input",
		name: "install",
		message: "Enter installation instructions. Markdown syntax is supported.",
	},
	{
		type: "input",
		name: "usage",
		message: "Enter usage information. Markdown syntax is supported.",
	},
	{
		type: "input",
		name: "contributing",
		message: "Enter a list of contributors. Separate entries with commas.",
	},
	{
		type: "input",
		name: "tests",
		message:
			"Enter information regarding testing. Markdown syntax is supported.",
	},
	{
		type: "list",
		name: "license",
		message: "Select a license.",
		choices: [
			"GNU AGPLv3",
			"GNU GPLv3",
			"GNU LGPLv3",
			"Mozilla Public License 2.0",
			"Apache License 2.0",
			"MIT License",
			"Boost Software License 1.0",
			"The Unlicense",
		],
	},
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
	inquirer.prompt(questions);
}

// Function call to initialize app
init();
