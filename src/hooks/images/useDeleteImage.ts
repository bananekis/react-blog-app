import { useCallback } from "react";
import { useApiClient } from "../../utils/apiClient";

export const useDeleteImage = () => {
  const apiClient = useApiClient();

  const deleteImage = useCallback(
    async (imageId: string, imageUrl: string) => {
      await apiClient.images.delete(imageId);
      URL.revokeObjectURL(imageUrl);
    },
    [apiClient],
  );

  return {
    deleteImage,
  };
};
