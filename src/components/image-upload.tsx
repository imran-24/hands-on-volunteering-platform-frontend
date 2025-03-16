import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

interface ImageUploadProps {
  disabled?: boolean;
  children: React.ReactNode;
  path: string;
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  children,
  path,
  onChange,
}) => {
  const [buffer, setBuffer] = useState<File | null>(null);

  console.log(buffer);
  
  const uploadImage = async (file: File | null) => {
    console.log(file);
    if(file === null) return;
    
    const fileRef = ref(storage, `${path}`);
    // Upload the file
    await uploadBytes(fileRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);
    console.log(downloadURL);
    onChange(downloadURL);
  };

  const handleDrop = useCallback((files: File[]) => {
    
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          setBuffer(file);
          await uploadImage(file);

        }
      };
      reader.readAsDataURL(file);
    }

    // const file = files[0];
    // const reader = new FileReader();
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // reader.onload = (e: any) => {
    //   setBase64(e.target.result);
    //   console.log(base64);
    //   uploadImage(e.target.result);
    //   // onChange(e.target.result)
    // };
    // reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div {...getRootProps({ className: "w-fit" })}>
      <input {...getInputProps()} />
      <div className=''>{children}</div>
    </div>
  );
};

export default ImageUpload;
