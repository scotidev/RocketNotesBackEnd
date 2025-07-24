import { promises as fs } from "fs";
import path from "path";
import { uploadConfig } from "../configs/upload.js";

export class DiskStorage {
  async saveFile(file) {
    await fs.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.stat(filePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        return;
      }
      throw error;
    }

    await fs.unlink(filePath);
  }
}
