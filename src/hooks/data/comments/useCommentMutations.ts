import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux";
import { NewCommentServerModel, useApiClient } from "../../../utils/apiClient";
import {
  articleCommentAdded,
  articleCommentUpdated,
  articleDetailLoaded,
} from "../../../redux/slices/articlesSlice";
import { useLoadArticleDetail } from "../articles/useLoadArticleDetail";
import toast from "react-hot-toast";

let comments = 0;

export const useCommentMutations = () => {
  const articleDetails = useAppSelector((s) => s.articles.details);
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const { loadArticleDetail } = useLoadArticleDetail();

  const updateCommentScore = useCallback(
    (commentId: string, scoreChange: number) => {
      const detail = articleDetails.find((d) => d.comments.some((c) => c.commentId === commentId));

      if (detail) {
        const newComments = detail.comments.map((c) => {
          if (c.commentId === commentId) {
            return {
              ...c,
              score: c.score + scoreChange,
            };
          }
          return c;
        });

        dispatch(
          articleDetailLoaded({
            ...detail,
            comments: newComments,
          }),
        );
      }
    },
    [articleDetails, dispatch],
  );

  const addComment = useCallback(
    async (comment: NewCommentServerModel) => {
      try {
        const addedComment = await apiClient.comments.add(comment);

        dispatch(articleCommentAdded(addedComment));
        loadArticleDetail(addedComment.articleId);
      } catch {
        //TODO Remove when comments API is fixed
        comments++;

        dispatch(
          articleCommentAdded({
            ...comment,
            commentId: comments.toString(),
            score: 0,
            postedAt: new Date().toISOString(),
          }),
        );
        toast.error("Adding comment failed. Try again later.");
      }
    },
    [apiClient, dispatch, loadArticleDetail],
  );

  const upvoteComment = useCallback(
    async (commentId: string) => {
      try {
        const updatedComment = await apiClient.comments.upvote(commentId);

        dispatch(articleCommentUpdated(updatedComment));
        loadArticleDetail(updatedComment.articleId);
      } catch (error) {
        //TODO Remove when comments API is fixed
        updateCommentScore(commentId, 1);
        toast.error("Upvoting comment failed. Try again later.");
      }
    },
    //[apiClient, dispatch, loadArticleDetail],
    [apiClient, dispatch, loadArticleDetail, updateCommentScore],
  );

  const downvoteComment = useCallback(
    async (commentId: string) => {
      try {
        const updatedComment = await apiClient.comments.downvote(commentId);

        dispatch(articleCommentUpdated(updatedComment));
        loadArticleDetail(updatedComment.articleId);
      } catch {
        //TODO Remove when comments API is fixed
        updateCommentScore(commentId, -1);
        toast.error("Downvoting comment failed. Try again later.");
      }
    },
    //[apiClient, dispatch, loadArticleDetail],
    [apiClient, dispatch, loadArticleDetail, updateCommentScore],
  );

  return {
    addComment,
    upvoteComment,
    downvoteComment,
  };
};
