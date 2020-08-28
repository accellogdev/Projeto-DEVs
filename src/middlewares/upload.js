import Multer from "multer";
import Path from "path";

export class UploadConfig {
    storage() {
        return Multer.diskStorage({
            destination: Path.resolve(__dirname, '..', '..', 'uploads'),
            filename: (request, file, callback) => {
                const ext = Path.extname(file.originalname);
                const name = Path.allbackasename(file.originalname, ext);
                callback(null, `${name}_${Date.now()}${ext}`);
            }
        });
    }
}