export default function generateDataString(data, errors) {
    return `
        ${errors ? `const validationErrors = ${JSON.stringify(errors)};` : ''}

        const data = ${JSON.stringify(data)};
        `
}
