import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';
/**
 * filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
 */

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: (request, file, callback) => {
          callback(null, resolve(__dirname, '..', '..', folder));
        },
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          callback(null, filename);
        },
      }),
    };
  },
};
