import { useCallback } from "react";
import { articleDetailLoaded } from "../../../redux/slices/articlesSlice";
import { useApiClient } from "../../../utils/apiClient";
import { useAppDispatch } from "../../redux";

export const useLoadArticleDetail = () => {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  const loadArticleDetail = useCallback(
    async (articleId: string) => {
      const articleDetail = await apiClient.articles.getDetail(articleId);

      dispatch(articleDetailLoaded(articleDetail));
    },
    [apiClient, dispatch],
  );

  return {
    loadArticleDetail,
  };
};
