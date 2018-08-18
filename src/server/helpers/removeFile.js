import fs from 'fs';

export default function removeFile(filePath, cb) {
    return fs.unlink(filePath, (err) => {
        if (err) throw err;

        console.log(`Successfully removed ${filePath}`);

        if (cb) {
            cb(err);
        }
    });
}
