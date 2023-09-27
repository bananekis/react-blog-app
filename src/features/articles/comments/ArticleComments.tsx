import { BaseSyntheticEvent, FC, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { NewCommentServerModel } from "../../../utils/apiClient";
import { ArticleComment as ArticleCommentDomainModel } from "../../../schemas/articleCommentSchema";
import { ArticleComment } from "./ArticleComment";

type Props = {
  readonly articleId: string;
  readonly comments: ReadonlyArray<ArticleCommentDomainModel>;
  readonly onAdd: (comment: NewCommentServerModel) => void;
  readonly onUpvote: (commentId: string) => void;
  readonly onDownvote: (commentId: string) => void;
};

export const ArticleComments: FC<Props> = ({
  articleId,
  comments,
  onAdd,
  onUpvote,
  onDownvote,
}) => {
  const [commentText, setCommentText] = useState("");

  const user = useAppSelector((s) => s.user);
  const isLoggedIn = !!user;

  const submitComment = (e: BaseSyntheticEvent): void => {
    e.preventDefault();
    setCommentText("");

    if (!user) {
      return;
    }

    const comment: NewCommentServerModel = {
      articleId,
      author: user.name,
      content: commentText,
    };

    onAdd(comment);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={submitComment}>
        <div className="grid gap-6">
          <h4 className="text-h4">Comments ({comments.length})</h4>
          <div className="flex gap-4">
              <input
                className="block w-full outline-none px-3 py-[6px] border-gray-50 border rounded-[4px]"
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
                placeholder="Join the discussion"
              />
            <button
              type="submit"
              className="py-[6px] px-3 text-white w-auto bg-blue-button rounded-[4px] cursor-pointer disabled:bg-gray disabled:cursor-default"
              disabled={!commentText || !isLoggedIn}
            >
              Comment
            </button>
          </div>
        </div>
      </form>
      <div className="grid gap-6">
        {comments.map((comment) => (
          <ArticleComment
            key={comment.commentId}
            comment={comment}
            isLoggedIn={isLoggedIn}
            onUpvote={() => onUpvote(comment.commentId)}
            onDownvote={() => onDownvote(comment.commentId)}
          />
        ))}
      </div>
    </div>
  );
};

ArticleComments.displayName = "ArticleComments";
