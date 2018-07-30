export function validator(obj, compartee, errors = {}) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            validator(obj[key], compartee[key], errors);
        }

        try {
            if (compartee.hasOwnProperty(key)) {
                if (typeof obj[key] !== typeof compartee[key]) {
                    errors[key] = 'Data type does not match.';
                }
            } else {
                errors[key] = 'Expected property is missing.';
            }
        } catch(err) {
            errors[key] = err.message;
        }
    });

    return errors;
}

export default function validateResponse(fixture) {
    if (!fixture.validate) {
        return Promise.resolve(null);
    }

    const { url, ...options } = fixture.validate;
    const mockedData = fixture.data || {};

    return fetch(url, options)
        .then(response => {
            return response;
        })
        .then(response => response.json())
        .then(data => {
            const errors = validator(mockedData, data);

            if (Object.keys(errors).length === 0) {
                return null;
            }

            return errors;
        })
        .catch(err => ({ error: err.message }));
}
