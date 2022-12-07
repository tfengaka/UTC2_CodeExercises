import { storage } from 'app/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
export const useFirebase = (category) => {
  const [loading, setLoading] = useState(false);

  const uploadFile = (file, fileName, type, callback) => {
    const metaData = {
      contentType: type,
    };
    const storageRef = ref(storage, `${category}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metaData);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        switch (snapshot.state) {
          case 'paused':
            setLoading(false);
            break;
          case 'running':
            setLoading(true);
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            alert(`Có lỗi xảy ra, vui lòng thử lại\nError Code: ${error.code}`);
            break;
          case 'storage/canceled':
            alert(`Có lỗi xảy ra, vui lòng thử lại\nError Code: ${error.code}`);
            break;
          case 'storage/unknown':
            alert(`Có lỗi xảy ra, vui lòng thử lại\nError Code: ${error.code}`);
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          callback(url);
          setLoading(false);
        });
      },
    );
  };

  return {
    loading,
    uploadFile,
  };
};
