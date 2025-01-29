import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const fileExtension = file.mimetype.split("/")[1];
        const fileName = uuidv4();
        cb(null, `${fileName}.${fileExtension}`);
    }
})

export const upload = multer({ storage: storage });