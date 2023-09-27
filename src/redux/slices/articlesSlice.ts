import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Article } from "../../schemas/articleSchema";
import { ArticleDetail } from "../../schemas/articleDetailSchema";
import { updateArrayElement } from "../../utils/updateArrayElement";
import { ArticleComment } from "../../schemas/articleCommentSchema";

type State = {
  readonly list: ReadonlyArray<Article>;
  readonly details: ReadonlyArray<ArticleDetail>;
};

const initialState: State = {
  list: [],
  details: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    articlesLoaded: (state, action: PayloadAction<ReadonlyArray<Article>>) => ({
      ...state,
      list: action.payload,
    }),
    articleDeleted: (state, action: PayloadAction<string>) => {
      const deletedArticleId = action.payload;
      const updatedList = state.list.filter((article) => article.articleId !== deletedArticleId);
      const updatedDetails = state.details.filter(
        (article) => article.articleId !== deletedArticleId,
      );

      return {
        list: updatedList,
        details: updatedDetails,
      };
    },
    articleDetailLoaded: (state, action: PayloadAction<ArticleDetail>) => {
      const originalDetail = state.details.find(
        (detail) => detail.articleId === action.payload.articleId,
      );
      const updatedDetails = originalDetail
        ? updateArrayElement(
            state.details,
            (detail) => detail.articleId === action.payload.articleId,
            () => action.payload,
          )
        : [...state.details, action.payload];

      return {
        ...state,
        details: updatedDetails,
      };
    },
    articleDetailCleared: (state, action: PayloadAction<string>) => {
      const articleId = action.payload;
      const updatedDetails = state.details.filter((article) => article.articleId !== articleId);

      return {
        ...state,
        details: updatedDetails,
      };
    },
    articleCommentAdded: (state, action: PayloadAction<ArticleComment>) => {
      const addedComment = action.payload;

      const updatedDetails = updateArrayElement(
        state.details,
        (articleDetail) => articleDetail.articleId === addedComment.articleId,
        (articleDetail) => ({
          ...articleDetail,
          comments: [...articleDetail.comments, addedComment],
        }),
      );

      return {
        ...state,
        details: updatedDetails,
      };
    },
    articleCommentUpdated: (state, action: PayloadAction<ArticleComment>) => {
      const updatedComment = action.payload;

      const updatedDetails = updateArrayElement(
        state.details,
        (articleDetail) => articleDetail.articleId === updatedComment.articleId,
        (articleDetail) => {
          const updatedComments = updateArrayElement(
            articleDetail.comments,
            (comment) => comment.commentId === updatedComment.commentId,
            () => updatedComment,
          );

          return {
            ...articleDetail,
            comments: updatedComments,
          };
        },
      );

      return {
        ...state,
        details: updatedDetails,
      };
    },
  },
});

export const {
  articlesLoaded,
  articleDeleted,
  articleDetailLoaded,
  articleDetailCleared,
  articleCommentAdded,
  articleCommentUpdated,
} = articlesSlice.actions;
