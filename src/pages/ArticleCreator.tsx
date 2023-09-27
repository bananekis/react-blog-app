import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleServerModel } from "../utils/apiClient";
import { useArticleMutations } from "../hooks/data/articles/useArticleMutations";
import { ArticleForm } from "../features/articles/form/ArticleForm";
import toast from "react-hot-toast";

export const ArticleCreator = () => {
  const [title, setTitle] = useState("");
  const [imageId, setImageId] = useState<string | null>(null);
  const [perex, setPerex] = useState("");
  const [content, setContent] = useState("");

  const isPublishEnabled = !!title && !!imageId && !!perex && !!content;

  const navigate = useNavigate();
  const { publishArticle } = useArticleMutations();

  const publish = async (): Promise<void> => {
    if (!isPublishEnabled) {
      return;
    }

    const article: ArticleServerModel = {
      content,
      imageId,
      perex,
      title,
    };

    toast.promise(publishArticle(article), {
      loading: "Loading",
      success: `Article ${title} successfuly published`,
      error: "Error when fetching",
    });

    navigate("/articles");
  };

  return (
    <div className="md:w-[75%]">
      <ArticleForm>
        <ArticleForm.Header
          header="Create new article"
          isDisabled={!isPublishEnabled}
          onPublish={publish}
        />
        <ArticleForm.Title value={title} onChange={setTitle} />
        <ArticleForm.Perex value={perex} onChange={setPerex} />
        <ArticleForm.Image imageId={imageId} onChange={setImageId} />
        <ArticleForm.Content value={content} onChange={setContent} />
      </ArticleForm>
    </div>
  );
};

ArticleCreator.displayName = "ArticleCreator";
