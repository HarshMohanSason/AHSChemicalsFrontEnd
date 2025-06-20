import { ref } from "firebase/database";
import { uploadBytes, getDownloadURL } from "firebase/storage";

//Returns urls of the files uploaded.
async function uploadMultipleFilesToStorage(
  files,
  mainDirName,
  fileDirName,
) {
  try {
    const fileUrls = [];
    for (let file of files) {
      if (file) {
        // Create a reference to the file in Firebase Storage
        const fileRef = ref(
          storage,
          `${mainDirName}/${fileDirName}/${file.name}`,
        );
        const metadata = {
          contentType: file.type || "application/octet-stream",
        };
        // Upload the file to Firebase Storage
        await uploadBytes(fileRef, file, metadata);

        // Get the download URL for the uploaded file
        const fileUrl = await getDownloadURL(fileRef);
        fileUrls.push(fileUrl);
      }
    }
    return fileUrls;
  } catch (error) {
    throw error;
  }
}

async function uploadSingleFileToStorage(
  file,
  mainDirName,
  fileDirName,
  fileName,
) {
  try {
    const finalFileName = fileName || `file-${crypto.randomUUID()}.pdf`;
    const fileRef = ref(
      storage,
      `${mainDirName}/${fileDirName}/${finalFileName}`,
    );
    const metadata = {
      contentType: file.type || "application/octet-stream",
    };
    await uploadBytes(fileRef, file, metadata);

    const fileUrl = await getDownloadURL(fileRef);
    return fileUrl;
  } catch (error) {
    throw error;
  }
}

export {
  uploadMultipleFilesToStorage, 
  uploadSingleFileToStorage,
}