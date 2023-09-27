import { FC } from "react";
import { DataUiAction, getDataUiAction } from "../../../constants/dataAttributes/dataUiAction";

const disabledPublishTitle = "Fill all fields and upload an image before publishing.";

type Props = {
  readonly header: string;
  readonly isDisabled: boolean;
  readonly onPublish: () => void;
};

export const ArticleHeader: FC<Props> = ({ header, isDisabled, onPublish }) => {
  return (
    <div className="flex gap-8 mb-10">
      <h1 className="text-h1">{header}</h1>
      <button
        className="py-[6px] my-[6px] px-3 text-white bg-blue-button rounded-[4px] cursor-pointer disabled:bg-gray disabled:cursor-default"
        onClick={onPublish}
        disabled={isDisabled}
        title={isDisabled ? disabledPublishTitle : undefined}
        {...getDataUiAction(DataUiAction.Publish)}
      >
        Publish Article
      </button>
    </div>
  );
};

ArticleHeader.displayName = "ArticleHeader";
