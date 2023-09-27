import { FC, ReactNode } from "react";
import IconArrowSort from "../../icons/IconArrowSort";

type Props = {
  readonly children: ReactNode;
  readonly areAllArticlesSelected: boolean;
  readonly onToggleAll: () => void;
};

export const MyArticlesTable: FC<Props> = ({ children, areAllArticlesSelected, onToggleAll }) => {
  return (
    <table className="flex flex-col min-w-full">
      <thead>
        <tr className="text-left border-b-gray-50 border-b-2">
          <th className="px-3 py-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              checked={areAllArticlesSelected}
              onChange={onToggleAll}
            />
          </th>
          <th className="p-3">
            <div className="flex items-center whitespace-nowrap w-[251px]">
              Article Title
              <IconArrowSort />
            </div>
          </th>
          <th className="p-3">
            <div className="flex items-center w-[419px]">
              Perex
              <IconArrowSort />
            </div>
          </th>
          <th className="p-3">
            <div className="flex items-center w-[163px]">
              Author
              <IconArrowSort />
            </div>
          </th>
          <th className="p-3">
            <div className="flex items-center w-[163px]">
              # of comments
              <IconArrowSort />
            </div>
          </th>
          <th className="p-3">
            <p className="w-[115px]">Actions</p>
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

MyArticlesTable.displayName = "MyArticlesTable";
