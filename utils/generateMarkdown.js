// in summary, this util takes user input and concatenates it into a single template literal, which is written to the .md file
function renderLicenseBadge(data) {
	if (data.license !== '(No license)')
		return `![${data.projectTitle}](${new URL(
			`https://img.shields.io/static/v1?label=license&message=${data.license}&color=informational`
		)})`;
	else return '';
}

const licenseUrl = {
	// property names with spaces may not be best practice, but it permits the code to identify the correct URL without further parsing of user input
	'GNU AGPLv3': 'https://choosealicense.com/licenses/agpl-3.0/',
	'GNU GPLv3': 'https://choosealicense.com/licenses/gpl-3.0/',
	'GNU LGPLv3': 'https://choosealicense.com/licenses/lgpl-3.0/',
	'Mozilla Public License 2.0': 'https://choosealicense.com/licenses/mpl-2.0/',
	'Apache License 2.0': 'https://choosealicense.com/licenses/apache-2.0/',
	'MIT License': 'https://choosealicense.com/licenses/mit/',
	'Boost Software License 1.0': 'https://choosealicense.com/licenses/bsl-1.0/',
	'The Unlicense': 'https://choosealicense.com/licenses/unlicense/',
};

const renderLicenseText = data => {
	if (data.license !== '(No license)') {
		return `
## License
This project is licensed using [${data.license}](${licenseUrl[data.license]}).
		`;
	} else return '';
};

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
	// regex correctly separates contributor input regardless of whether user used spaces after semicolons
	const list = data.contributing.split(/[;]\ */g) || [];

	if (data.contributing) {
		body += `
## Contributors
`;
	}

	for (let i = 0; i < list.length; i++)
		body += `
- ${list[i]}`;

	body += renderLicenseText(data);

	return body;
};

function generateMarkdown(data) {
	let markdown =
		`
# ${data.projectTitle}
${renderLicenseBadge(data)}

## Description
${data.description}
` + renderBody(data);

	return markdown;
}

module.exports = generateMarkdown;
