import { FC, useState } from "react";
import { ArticleForm } from "../features/articles/form/ArticleForm";
import { useArticleMutations } from "../hooks/data/articles/useArticleMutations";
import { ArticleServerModel } from "../utils/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { useArticleDetail } from "../hooks/data/articles/useArticleDetail";
import { ArticleDetail } from "../schemas/articleDetailSchema";
import toast from "react-hot-toast";

type ArticleEditorParams = {
  readonly articleId: string;
};

const ArticleEditorWrapper = () => {
  const { articleId } = useParams() as ArticleEditorParams;
  const articleDetail = useArticleDetail(articleId);

  if (!articleDetail) {
    return null;
  }

  console.log(articleDetail);

  return <ArticleEditor articleDetail={articleDetail} />;
};

ArticleEditorWrapper.displayName = "ArticleEditorWrapper";

type Props = {
  readonly articleDetail: ArticleDetail;
};

const ArticleEditor: FC<Props> = ({ articleDetail }) => {
  const [title, setTitle] = useState(articleDetail.title);
  const [imageId, setImageId] = useState<string | null>(articleDetail.imageId);
  const [perex, setPerex] = useState(articleDetail.perex);
  const [content, setContent] = useState(articleDetail.content);

  const isPublishEnabled = !!title && !!imageId && !!perex && !!content;

  const navigate = useNavigate();
  const { updateArticle } = useArticleMutations();

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

    toast.promise(updateArticle(articleDetail.articleId, article), {
      loading: "Loading",
      success: `Article ${title} successfuly edited`,
      error: "Error when fetching",
    });

    navigate("/articles");
  };

  if (!articleDetail) {
    return null;
  }

  return (
    <div className="md:w-[70%]">
      <ArticleForm>
        <ArticleForm.Header
          header="Edit article"
          isDisabled={!isPublishEnabled}
          onPublish={publish}
        />
        <ArticleForm.Title value={title} onChange={setTitle} />
        <ArticleForm.Image imageId={imageId} onChange={setImageId} />
        <ArticleForm.Perex value={perex} onChange={setPerex} />
        <ArticleForm.Content value={content} onChange={setContent} />
      </ArticleForm>
    </div>
  );
};

ArticleEditor.displayName = "ArticleEditor";

export { ArticleEditorWrapper as ArticleEditor };
