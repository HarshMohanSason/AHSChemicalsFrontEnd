import { ref } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./FirebaseConfig";

async function uploadMultipleFilesToStorage(files, storagePath) {
  try {
    const fileUrls = [];

    for (let file of files) {
      if (file) {
        const filePath = `${storagePath}/${crypto.randomUUID()}_${file.name}`;
        const metadata = {
          contentType: file.type || "application/octet-stream",
          customMetadata: {
            uploadedAt: new Date().toISOString(),
          },
        };

        const fileRef = ref(storage, filePath);
        await uploadBytes(fileRef, file, metadata);
        const fileUrl = await getDownloadURL(fileRef);
        fileUrls.push(fileUrl);
      }
    }
    return fileUrls;
  } catch (error) {
    throw error;
  }
}

async function uploadSingleFileToStorage(file, storagePath) {
  try {
    const metadata = {
      contentType: file.type || "application/octet-stream",
      customMetadata: {
        uploadedAt: new Date().toISOString(),
      },
    };

    const fileRef = ref(storage, storagePath);
    await uploadBytes(fileRef, file, metadata);

    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  } catch (error) {
    throw error;
  }
}

export { uploadMultipleFilesToStorage, uploadSingleFileToStorage };
