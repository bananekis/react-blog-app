import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../hooks/data/articles/useArticles";
import { useArticleMutations } from "../hooks/data/articles/useArticleMutations";
import { MyArticleRow } from "../features/articles/MyArticleRow";
import { MyArticlesTable } from "../features/articles/MyArticlesTable";

export const MyArticles: FC = () => {
  const [selection, setSelection] = useState<ReadonlySet<string>>(new Set());
  const navigate = useNavigate();

  const articles = useArticles();
  const { deleteArticle } = useArticleMutations();

  const openNewArticlePage = (): void => {
    navigate("new");
  };

  const openEditing = (articleId: string): void => {
    navigate(articleId);
  };

  const areAllArticlesSelected = articles.every((article) => selection.has(article.articleId));
  const isAnyArticleSelected = selection.size > 0;

  const toggleAll = (): void => {
    if (areAllArticlesSelected) {
      setSelection(new Set());
    } else {
      const allArticlesIds = articles.map((article) => article.articleId);

      setSelection(new Set(allArticlesIds));
    }
  };

  const deleteSelectedArticles = (): void => {
    Array.from(selection).forEach(deleteArticle);
    setSelection(new Set());
  };

  return (
    <div>
      <div className="flex gap-8 mb-10">
        <h1 className="text-h1">My articles</h1>
        <button
          onClick={openNewArticlePage}
          className="py-[6px] my-[6px] px-3 text-white bg-blue-button rounded-[4px] cursor-pointer"
        >
          Create new article
        </button>
        {isAnyArticleSelected && (
          <button
            onClick={deleteSelectedArticles}
            className="py-[6px] my-[6px] px-3 text-white bg-red-button rounded-[4px] cursor-pointer"
          >
            Delete
          </button>
        )}
      </div>
      <div className="overflow-auto">
        <MyArticlesTable
          areAllArticlesSelected={areAllArticlesSelected && articles.length > 0}
          onToggleAll={toggleAll}
        >
          {articles.map((article) => {
            const isSelected = selection.has(article.articleId);

            const toggleSelection = (articleId: string): void => {
              const updatedSelection = new Set(selection);

              if (isSelected) {
                updatedSelection.delete(articleId);
              } else {
                updatedSelection.add(articleId);
              }

              setSelection(updatedSelection);
            };

            return (
              <MyArticleRow
                key={article.articleId}
                article={article}
                isSelected={isSelected}
                onEdit={() => openEditing(article.articleId)}
                onDelete={() => deleteArticle(article.articleId)}
                onToggle={() => toggleSelection(article.articleId)}
              />
            );
          })}
        </MyArticlesTable>
      </div>
    </div>
  );
};

MyArticles.displayName = "MyArticles";
