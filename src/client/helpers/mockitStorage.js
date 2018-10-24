import { Storage } from '@client/enums';

function getRootStorage() {
    return JSON.parse(localStorage.getItem(Storage.PRIMARY_KEY));
}

function getItem(key) {
    const storage = getRootStorage();
    if (storage) {
        return storage[key];
    }
}

function setItem(key, value) {
    const storage = getRootStorage();
    const nextStorage = {
        ...storage,
        [key]: value,
    };

    localStorage.setItem(Storage.PRIMARY_KEY, JSON.stringify(nextStorage));

    return getRootStorage();
}

export default {
    getItem,
    setItem,
};
