import { Storage } from "@google-cloud/storage";
import { unlink } from "fs";

const credentials = Buffer.from(
    process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT_KEY_BASE64!,
    "base64"
).toString();

const storage = new Storage({
    credentials: JSON.parse(credentials),
});

/*
 I dunno how, but somehow root to all paths here seems to be /server/src
 */
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

export const uploadImageList = (fileList: Express.Multer.File[]) => {
    let imgUrlList: string[] = [];
    fileList.forEach(async (file) => {
        const imgUrl = await uploadImage(file);
        imgUrlList.push(imgUrl);
    });

    return imgUrlList;
}

export const deleteImage = async (filePathToPublic: string) => {
    try {
        const fileName = filePathToPublic.substring(
            filePathToPublic.lastIndexOf("/") + 1
        );

        await storage
            .bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME!)
            .file(`images/${fileName}`)
            .delete();
    } catch (error) {
        console.log(`Error deleting the file in bucket: ${error}`);
    }
};

// Access it through: https://storage.googleapis.com/example_test_777/images/logo.jpg
