import { FC } from "react";
import { DataUiInput, getDataUiInput } from "../../../constants/dataAttributes/dataUiInput";

type Props = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export const ArticlePerex: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid gap-2 mb-8">
      <label htmlFor="perex">Perex</label>
      <input
        id="perex"
        className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px]"
        placeholder="Discover the enchanting world of cats..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...getDataUiInput(DataUiInput.Perex)}
      />
    </div>
  );
};

ArticlePerex.displayName = "ArticlePerex";
