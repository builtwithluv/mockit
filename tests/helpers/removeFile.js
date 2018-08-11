import fs from 'fs';
import path from 'path';

export default function removeFile(filePath, cb) {
    const p = path.resolve(filePath);
    return fs.unlink(p, (err) => {
        if (err) throw err;
        cb(err);
    });
}
