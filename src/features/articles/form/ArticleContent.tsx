import { FC } from "react";
import { DataUiInput, getDataUiInput } from "../../../constants/dataAttributes/dataUiInput";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

export const ArticleContent: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="grid gap-2 mb-8">
      <label htmlFor="content">Content</label>
      <MDEditor
        id="content"
        value={value}
        onChange={(newValue) => onChange(newValue || "")}
        className="bg-white shadow-none p-0 m-[-10px]"
        hideToolbar
        height={520}
        preview="edit"
        visibleDragbar={false}
        renderTextarea={() => (
          <textarea
            id="content"
            rows={20}
            className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px] text-base resize-none text-gray-200 bg-white"
            placeholder="Supports markdown. Yay!&#10;&#10;Leave blank space for a new line"
            value={value}
            onChange={(newValue) => onChange(newValue.target.value ?? "")}
            {...getDataUiInput(DataUiInput.Content)}
          />
        )}
      />
    </div>
  );
};

ArticleContent.displayName = "ArticleContent";
