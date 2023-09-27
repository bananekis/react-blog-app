import { ArticleDetail } from "../../../schemas/articleDetailSchema";
import { useAppDispatch, useAppSelector } from "../../redux";
import { useEffect } from "react";
import { articleDetailCleared } from "../../../redux/slices/articlesSlice";
import { useLoadArticleDetail } from "./useLoadArticleDetail";

export const useArticleDetail = (articleId: string): ArticleDetail | null => {
  const dispatch = useAppDispatch();

  const { loadArticleDetail } = useLoadArticleDetail();

  useEffect(() => {
    loadArticleDetail(articleId);

    return () => {
      dispatch(articleDetailCleared(articleId));
    };
  }, [dispatch, loadArticleDetail, articleId]);

  return useAppSelector(
    (s) => s.articles.details.find((article) => article.articleId === articleId) ?? null,
  );
};
