// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(data) {
	if (data.license !== '(No license)')
		return `[!${data.projectTitle}](https://img.shields.io/static/v1?label=license&message=${data.license}&color=informational)`;
	else return '';
}

const renderBody = data => {
	let body = ``;
	if (data.install) {
		body += `
## Installation
${data.install}

`;
	}

	if (data.usage) {
		body += `
## Usage
${data.usage}

`;
	}

	if (data.tests) {
		body += `
## Testing
${data.tests}

`;
	}

	if (data.contributing) {
		const list = data.contributing.split(/[;]\h*/);
		body += `
## Contributors
`;

		for (const con in list)
			body += `
- ${con}
`;
	}

	return body;
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
	console.log(data);
	let markdown =
		`
# ${data.projectTitle}
---
${renderLicenseBadge(data)}

## Description
${data.description}

` + renderBody(data);

	return markdown;
}

module.exports = generateMarkdown;
