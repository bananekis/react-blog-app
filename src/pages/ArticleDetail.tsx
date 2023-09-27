import { FC } from "react";
import { useArticleDetail } from "../hooks/data/articles/useArticleDetail";
import { useParams } from "react-router-dom";
import { useCommentMutations } from "../hooks/data/comments/useCommentMutations";
import { useImageUrl } from "../hooks/images/useImageUrl";
import { ArticleComments } from "../features/articles/comments/ArticleComments";
import IconCircleDivider from "../icons/IconCircleDivider";
import { formatDate } from "../utils/formatDate";
import { useAppSelector } from "../hooks/redux";
import IconLogo from "../icons/IconLogo";
import MDEditor from "@uiw/react-md-editor";

type ArticleDetailParams = {
  readonly articleId: string;
};

export const ArticleDetail: FC = () => {
  const { articleId } = useParams() as ArticleDetailParams;
  const username = useAppSelector((s) => s.user?.name) ?? "-";
  const articleDetail = useArticleDetail(articleId);

  const { addComment, upvoteComment, downvoteComment } = useCommentMutations();

  const { imageUrl, loading } = useImageUrl(articleDetail?.imageId ?? null);

  if (!articleDetail) {
    return null;
  }

  return (
    <div className="grid gap-6 md:w-[70%]">
      <h1 className="text-h1">{articleDetail.title}</h1>
      <div className="flex items-center text-gray-200 text-sm">
        <p>{username}</p>
        <IconCircleDivider className="mx-3" />
        <p>{formatDate(articleDetail.createdAt)}</p>
      </div>
      <div className="flex items-center justify-center">
        {imageUrl && !loading ? (
          <img
            src={imageUrl}
            className="border border-gray-50 rounded-[4px] w-full h-full object-cover"
          />
        ) : (
          <IconLogo className="animate-spin" />
        )}
      </div>
      <MDEditor.Markdown
        source={articleDetail.content}
        className="prose bg-white max-w-none"
        wrapperElement={{ "data-color-mode": "light" }}
      />
      <hr className="bg-gray-50 h-px border-0" />
      <ArticleComments
        articleId={articleId}
        comments={articleDetail.comments}
        onAdd={addComment}
        onUpvote={upvoteComment}
        onDownvote={downvoteComment}
      />
    </div>
  );
};

ArticleDetail.displayName = "ArticleDetail";
