import { FC } from "react";
import IconVoteDown from "../../../icons/IconVoteDown";
import IconVoteUp from "../../../icons/IconVoteUp";
import { ArticleComment as ArticleCommentDomainModel } from "../../../schemas/articleCommentSchema";
import { formatTimeAgo } from "../../../utils/formatDate";

type Props = {
  readonly comment: ArticleCommentDomainModel;
  readonly isLoggedIn: boolean;
  readonly onUpvote: () => void;
  readonly onDownvote: () => void;
};

export const ArticleComment: FC<Props> = ({ comment, isLoggedIn, onUpvote, onDownvote }) => {
  const commentScoreIdentifier = comment.score >= 0 ? `+${comment.score}` : comment.score;

  return (
    <div className="grid gap-2">
      <div className="flex gap-2 items-center">
        <p className="font-bold">{comment.author}</p>
        <p className="text-sm text-gray-200">{formatTimeAgo(comment.postedAt)}</p>
      </div>
      <p className="text-base">{comment.content}</p>
      <div className="flex">
        <p className="text-base">{commentScoreIdentifier}</p>
        {isLoggedIn && (
          <div className="flex items-center">
            <span className="mx-2 text-gray-100">|</span>
            <IconVoteUp onClick={onUpvote} className="cursor-pointer" />
            <span className="mx-2 text-gray-100">|</span>
            <IconVoteDown onClick={onDownvote} className="cursor-pointer" />
            <span className="mx-2 text-gray-100">|</span>
          </div>
        )}
      </div>
    </div>
  );
};

ArticleComment.displayName = "ArticleComment";
