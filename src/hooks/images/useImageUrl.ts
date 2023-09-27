import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useApiClient } from "../../utils/apiClient";

export const useImageUrl = (imageId: string | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiClient = useApiClient();

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) {
        setImageUrl(null);
        setLoading(false);
        return;
      }

      try {
        const imageFile = await apiClient.images.get(imageId);
        const imageUrl = URL.createObjectURL(imageFile);
        setImageUrl(imageUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to get the image");
      }
    };

    fetchImage();
  }, [apiClient, imageId]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return { imageUrl, loading };
};
