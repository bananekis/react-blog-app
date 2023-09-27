import { FC } from "react";
import { DataUiInput, getDataUiInput } from "../../../constants/dataAttributes/dataUiInput";

type Props = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export const ArticleTitle: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid gap-2 mb-8">
      <label htmlFor="title">Article Title</label>
      <input
        id="title"
        className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px]"
        placeholder="My First Article"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...getDataUiInput(DataUiInput.Title)}
      />
    </div>
  );
};

ArticleTitle.displayName = "ArticleTitle";
