export function validator(original, compartee, errors = {}) {
    if (typeof original === 'object') {
        Object.keys(original).forEach(key => {
            if (typeof original[key] === 'object' && !Array.isArray(original[key])) {
                validator(original[key], compartee[key], errors);
            }

            try {
                if (compartee.hasOwnProperty(key)) {
                    if (typeof original[key] !== typeof compartee[key]) {
                        errors[key] = `Data type does not match. Received ${typeof compartee[key]}.`;
                    }
                } else {
                    errors[key] = 'Expected property is missing.';
                }
            } catch (err) {
                errors[key] = err.message;
            }
        });
    } else {
        if (original !== compartee) {
            errors[original] = `Data type does not match. Received ${typeof compartee}`;
        }
    }

    return errors;
}

export function validateResponse(fixture) {
    if (!fixture.validator) {
        return Promise.resolve(false);
    }

    const { url, ...options } = fixture.validator;
    const mockedData = fixture.data || {};

    return fetch(url, options)
        .then(response => {
            // TODO Handle all possible header types
            if (response.headers.get('content-type').includes('text')) {
                return response.text();
            }

            return response.json();
        })
        .then(data => {
            const errors = validator(mockedData, data);

            if (Object.keys(errors).length === 0) {
                return null;
            }

            return errors;
        })
        .catch(err => ({ error: err.message }));
}

export default validateResponse;
