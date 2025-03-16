// import React from 'react'

import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import { toast } from "sonner";
import { extractFilePath } from "@/utils/constant";

interface CoverProps {
  coverImage: string;
  userId?: string;
}

const Cover = ({ coverImage, userId }: CoverProps) => {
  const [image, setImage] = useState(coverImage);
  const [loading, setLoading] = useState(false);

  const path =
    extractFilePath(image) ||
    `/event-management/user/${userId}/cover/${uuidv4()}`;

  console.log(path);
  const uploadCover = async (url: string) => {
    setLoading(true);
    console.log(url);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_REACT_BASE_URL}/users/${userId}`,
        { coverImage: url }
      );

      setImage(response.data.coverImage);

      toast.success("Profile updated");

      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.success("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (image.startsWith("bg-gradient")) {
    return (
      <div className='relative aspect-[10/2.5]'>
        <div
          className={`${image} object-cover h-full w-full object-center rounded-t-3xl`}
        />
        <ImageUpload path={path} disabled={loading} onChange={uploadCover}>
          <Button className='absolute bottom-4 right-4' variant={"secondary"}>
            Add Cover
          </Button>
        </ImageUpload>
      </div>
    );
  }
  return (
    <div className='relative aspect-[10/2.5]'>
      <img
        src={image}
        className={`w-full h-full object-cover object-center rounded-t-3xl`}
      />
      <ImageUpload
        path={`/event-management/users/${userId}/profile`}
        disabled={loading}
        onChange={uploadCover}
      >
        <Button className='absolute bottom-3 right-3' variant={"secondary"}>
          Change Cover
        </Button>
      </ImageUpload>
    </div>
  );
};

export default Cover;
