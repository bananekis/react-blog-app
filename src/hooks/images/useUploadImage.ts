import { useCallback } from "react";
import { useApiClient } from "../../utils/apiClient";
import { ImageInfo } from "../../schemas/imageInfoSchema";
import { toast } from "react-hot-toast";

export const useUploadImage = () => {
  const apiClient = useApiClient();

  const uploadImage = useCallback(
    async (image: Blob): Promise<ImageInfo | null> => {
      try {
        const imageInfo = await apiClient.images.upload(image);

        if (!imageInfo) {
          toast.error(`${__filename}: Failed to upload image.`);
        }

        return imageInfo;
      } catch {
        toast.error("Image upload error");
        return null;
      }
    },
    [apiClient],
  );

  return {
    uploadImage,
  };
};
