import { useCallback } from "react";
import { useApiClient } from "../../../utils/apiClient";
import { useAppDispatch } from "../../redux";
import { articlesLoaded } from "../../../redux/slices/articlesSlice";
import { Article } from "../../../schemas/articleSchema";

const sorter = (articleA: Article, articleB: Article): number => {
  const dateA = new Date(articleA.createdAt);
  const dateB = new Date(articleB.createdAt);

  return +dateB - +dateA;
};

export const useLoadArticlesList = () => {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  const loadArticlesList = useCallback(async () => {
    const articles = await apiClient.articles.getList();
    const sortedArticles = articles.slice().sort(sorter);

    dispatch(articlesLoaded(sortedArticles));
  }, [apiClient, dispatch]);

  return {
    loadArticlesList,
  };
};
