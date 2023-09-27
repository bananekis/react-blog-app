import { FC } from "react";
import { Article as ArticleDomainModel } from "../../schemas/articleSchema";
import { useImageUrl } from "../../hooks/images/useImageUrl";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import IconCircleDivider from "../../icons/IconCircleDivider";
import { useAppSelector } from "../../hooks/redux";
import IconLogo from "../../icons/IconLogo";

type Props = {
  readonly article: ArticleDomainModel;
};

export const Article: FC<Props> = ({ article }) => {
  const { imageUrl, loading } = useImageUrl(article.imageId);
  const username = useAppSelector((s) => s.user?.name) ?? "-";

  return (
    <div className="flex gap-6 md:flex-row flex-col">
      <div className="flex items-center justify-center md:w-[272px] md:h-[244px]">
        {imageUrl && !loading ? (
          <img
            src={imageUrl}
            className="w-full h-full object-cover border border-gray-50 rounded-[4px]"
          />
        ) : (
          <IconLogo className="animate-spin" />
        )}
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <h4 className="text-h4">{article.title}</h4>
        <div className="flex items-center text-gray-200 text-sm">
          <p>{username}</p>
          <IconCircleDivider className="mx-3" />
          <p>{formatDate(article.createdAt)}</p>
        </div>
        <p className="whitespace-normal">{article.perex}</p>
        <div className="flex items-center gap-2 text-sm">
          <div className="py-1 px-2">
            <Link to={article.articleId} className="text-blue-button">
              Read whole article
            </Link>
          </div>
          {/* //TODO API missing content.length */}
          <p className="text-gray-200">- comments</p>
        </div>
      </div>
    </div>
  );
};

Article.displayName = "Article";
