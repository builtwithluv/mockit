const fetch = require('node-fetch');
const inquirer = require('inquirer');
const getConfig = require('./helpers/getConfig');

const prompt = inquirer.createPromptModule();

prompt([
    {
        name: 'url',
        message: 'What is the API you wish to call?',
        validate: val => val ? true : 'You must specify a url',
    },
    {
        name: 'method',
        default: 'GET',
        message: 'What is the HTTP method?',
    },
    {
        type: 'confirm',
        name: 'shouldAddHeaders',
        message: 'Would you like to add headers?',
    },
    {
        type: 'confirm',
        name: 'useCustomHeaders',
        message: 'Would you like to use headers defined in the .testy file?',
        when: answers => answers.shouldAddHeaders === true,
    },
    {
        type: 'editor',
        name: 'userInputHeader',
        message: 'Please specify header',
        when: answers => answers.useCustomHeaders === false,
    },
])
.then(({ url, method, shouldAddHeaders, useCustomHeaders, userInputHeader }) => {
    const config = getConfig();
    const headers = shouldAddHeaders
        ? useCustomHeaders
            ? config.headers
            : userInputHeader
        : undefined;

    return fetch(url, {
        method,
        headers,
    });
})
.then(data => data.json())
.then(data => {
    console.log(data);
    return prompt([
        {
            type: 'confirm',
            name: 'shouldContinue',
            message: 'Do you wish to continue with the above response?',
        }
    ]);
});

// https://api.github.com/users/github

