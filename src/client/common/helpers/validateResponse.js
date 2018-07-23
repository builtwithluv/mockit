export default function validateResponse(fixture) {
    if (!fixture.validate) {
        return Promise.resolve(null);
    }

    const { url, ...options } = fixture.validate;
    const mockedData = fixture.data;

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw('Unable to fetch');
            }

            return response;
        })
        .then(response => response.json())
        .then(data => {
            const errors = {};

            Object.keys(mockedData).forEach(key => {
                if (data.hasOwnProperty(key)) {
                    if (typeof mockedData[key] !== typeof data[key]) {
                        errors[key] = 'Data type does not match.';
                    }
                } else {
                    errors[key] = 'Expected property is missing.';
                }
            });

            if (Object.keys(errors).length === 0) {
                return null;
            }

            return errors;
        })
        .catch(err => err);
}
