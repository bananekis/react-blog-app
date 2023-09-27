import { useCallback } from "react";
import { ArticleServerModel, useApiClient } from "../../../utils/apiClient";
import { useAppDispatch } from "../../redux";
import { articleDeleted } from "../../../redux/slices/articlesSlice";
import { useLoadArticlesList } from "./useLoadArticlesList";
import { ArticleDetail, articleDetailSchema } from "../../../schemas/articleDetailSchema";
import { useLoadArticleDetail } from "./useLoadArticleDetail";

export const useArticleMutations = () => {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  const { loadArticlesList } = useLoadArticlesList();
  const { loadArticleDetail } = useLoadArticleDetail();

  const publishArticle = useCallback(
    async (article: ArticleServerModel): Promise<ArticleDetail> => {
      const response = await apiClient.articles.create(article);

      loadArticlesList();

      return articleDetailSchema.parse(response);
    },
    [apiClient, loadArticlesList],
  );

  const updateArticle = useCallback(
    async (articleId: string, article: ArticleServerModel): Promise<ArticleDetail> => {
      const response = await apiClient.articles.update(articleId, article);

      loadArticleDetail(articleId);

      return articleDetailSchema.parse(response);
    },
    [apiClient, loadArticleDetail],
  );

  const deleteArticle = useCallback(
    async (articleId: string): Promise<void> => {
      dispatch(articleDeleted(articleId));
      await apiClient.articles.delete(articleId);
      loadArticlesList();
    },
    [apiClient, dispatch, loadArticlesList],
  );

  return {
    publishArticle,
    updateArticle,
    deleteArticle,
  };
};
