import { Storage } from "@google-cloud/storage";
import { unlink } from "fs";

const credentials = Buffer.from(
    process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY_BASE64!,
    'base64'
).toString();

const storage = new Storage({
    credentials: JSON.parse(credentials)
});

const removeFile = (filePath: string) => {
    unlink(filePath, (error) => {
        if (error) {
            throw new Error(
                `Error deleting the image on disk: ${error.message}`
            );
        }
    });
};

export const uploadImage = async (file: Express.Multer.File) => {
    try {
        const destination = `images/${file.filename}`;
        const options = {
            destination: destination,
            public: true,
            metadata: {
                contentType: file.mimetype,
                metadata: {
                    uploadedAt: new Date().toISOString(),
                },
            },
        };

        await storage
            .bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!)
            .upload(`./uploads/${file.filename}`, options);

        removeFile(file.path);

        return `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${destination}`;
    } catch (error) {
        removeFile(file.path);

        console.log(error);

        throw new Error(
            `Failed to upload image to cloud: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
};

// Access it through: https://storage.googleapis.com/example_test_777/images/logo.jpg
