import { FC } from "react";
import { Article } from "../../schemas/articleSchema";
import IconEdit from "../../icons/IconEdit";
import IconDelete from "../../icons/IconDelete";
import { useAppSelector } from "../../hooks/redux";

type Props = {
  readonly article: Article;
  readonly isSelected: boolean;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly onToggle: () => void;
};

export const MyArticleRow: FC<Props> = ({ article, isSelected, onEdit, onDelete, onToggle }) => {
  const username = useAppSelector((s) => s.user?.name) ?? "-";

  return (
    <tr>
      <td className="px-3 py-4">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          checked={isSelected}
          onChange={onToggle}
        />
      </td>
      <td className="p-3 border-b-gray-50 border-b">
        <p className="w-[251px] truncate overflow-ellipsis">{article.title}</p>
      </td>
      <td className="p-3 border-b-gray-50 border-b">
        <p className="w-[419px] truncate overflow-ellipsis">{article.perex}</p>
      </td>
      <td className="p-3 border-b-gray-50 border-b">
        <p className="w-[163px] truncate overflow-ellipsis">{username}</p>
      </td>
      <td className="p-3 border-b-gray-50 border-b">
        {/* //TODO missing API comments.lengths on /articles endpoint */}
        <p className="w-[163px] truncate overflow-ellipsis">- comments</p>
      </td>
      <td className="p-3 border-b-gray-50 border-b">
        <div className="flex gap-6 w-[115px]">
          <IconEdit onClick={onEdit} className="cursor-pointer" />
          <IconDelete onClick={onDelete} className="cursor-pointer" />
        </div>
      </td>
    </tr>
  );
};

MyArticleRow.displayName = "MyArticleRow";
