import { ChangeEvent, FC } from "react";
import { useImageUrl } from "../../../hooks/images/useImageUrl";
import { useUploadImage } from "../../../hooks/images/useUploadImage";
import { useDeleteImage } from "../../../hooks/images/useDeleteImage";
import { DataUiInput, getDataUiInput } from "../../../constants/dataAttributes/dataUiInput";
import IconLogo from "../../../icons/IconLogo";

type Props = {
  readonly imageId: string | null;
  readonly onChange: (imageId: string | null) => void;
};

export const ArticleImage: FC<Props> = ({ imageId, onChange }) => {
  const { imageUrl, loading } = useImageUrl(imageId);
  const { uploadImage } = useUploadImage();
  const { deleteImage } = useDeleteImage();

  const onUploadImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const imageFile = e.currentTarget.files?.[0];

    if (imageFile) {
      const imageInfo = await uploadImage(imageFile);
      imageInfo?.imageId && onChange(imageInfo.imageId);
    }
  };

  const onDeleteImage = (): void => {
    if (imageId && imageUrl) {
      deleteImage(imageId, imageUrl);
      onChange(null);
    }
  };

  const uploadNewImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    onDeleteImage();
    await onUploadImage(e);
  };

  const ImageUploader = () => {
    if (loading) {
      return <IconLogo className="animate-spin w-5 h-5" />;
    } else if (imageUrl) {
      return (
        <>
          <img src={imageUrl} className="w-28 h-20 object-cover" alt="Image" />
          <div className="flex">
            <label className="cursor-pointer text-blue">
              <input type="file" multiple={false} onChange={uploadNewImage} className="hidden" />
              Upload new
            </label>
            <span className="mx-2 text-gray-100">|</span>
            <button onClick={onDeleteImage} className="text-red">
              Delete
            </button>
          </div>
        </>
      );
    } else {
      return (
        <label className="py-[6px] my-[6px] px-3 text-white bg-gray-200 rounded-[4px] cursor-pointer w-fit">
          <input
            type="file"
            multiple={false}
            onChange={onUploadImage}
            className="hidden"
            {...getDataUiInput(DataUiInput.Image)}
          />
          Upload an Image
        </label>
      );
    }
  };

  return (
    <div className="grid gap-2 mb-8">
      <label htmlFor="image">Featured image</label>
      <ImageUploader />
    </div>
  );
};

ArticleImage.displayName = "ArticleImage";
