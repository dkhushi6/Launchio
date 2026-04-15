import { S3Client, PutObjectCommand, Bucket$ } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import mime from "mime-types";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function UploadFiles(directoryPath: any, basePath: string) {
  //read files , folder
  const files = fs.readdirSync(directoryPath);
  for (const file of files) {
    const fullPath = path.join(directoryPath, file);
    const dirCheck = fs.statSync(fullPath);
    if (dirCheck.isDirectory()) {
      await UploadFiles(fullPath, path.join(basePath, file));
    } else {
      const fileStream = fs.createReadStream(fullPath);
      const mimeType = mime.lookup(fullPath);
      const contentType = mimeType || undefined;
      const uploadParams = {
        Bucket: "vercel-kay-demo",
        Key: path.join(basePath, file).replace(/\\/g, "/"),
        Body: fileStream,
        ContentType: contentType,
      };
      await s3.send(new PutObjectCommand(uploadParams));
    }
  }
}
