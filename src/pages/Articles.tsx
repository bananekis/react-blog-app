import { FC } from "react";
import { useArticles } from "../hooks/data/articles/useArticles";
import { Article } from "../features/articles/Article";
import {
  DataUiCollection,
  getDataUiCollection,
} from "../constants/dataAttributes/dataUiCollection";

export const Articles: FC = () => {
  const articles = useArticles();

  return (
    <div className="md:w-[70%]">
      <h1 className="text-h1 mb-14">Recent articles</h1>
      <div className="grid gap-8" {...getDataUiCollection(DataUiCollection.Article)}>
        {articles.length > 0 ? (
          articles.map((article) => <Article key={article.articleId} article={article} />)
        ) : (
          <h4 className="text-h4 text-gray-200">No articles yet</h4>
        )}
      </div>
    </div>
  );
};

Articles.displayName = "Articles";
