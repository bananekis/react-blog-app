import { useEffect } from "react";
import { useAppSelector } from "../../redux";
import { Article } from "../../../schemas/articleSchema";
import { useLoadArticlesList } from "./useLoadArticlesList";

export const useArticles = (): ReadonlyArray<Article> => {
  const { loadArticlesList } = useLoadArticlesList();

  useEffect(() => {
    loadArticlesList();
  }, [loadArticlesList]);

  return useAppSelector((s) => s.articles.list);
};
