import { FC, ReactNode } from "react";
import { ArticlePerex } from "./ArticlePerex";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleContent } from "./ArticleContent";
import { ArticleImage } from "./ArticleImage";
import { ArticleTitle } from "./ArticleTitle";

type Props = {
  readonly children: ReactNode;
};

const ArticleForm: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

ArticleForm.displayName = "ArticleForm";

const ArticleFormComposition = Object.assign(ArticleForm, {
  Header: ArticleHeader,
  Title: ArticleTitle,
  Perex: ArticlePerex,
  Image: ArticleImage,
  Content: ArticleContent,
});

export { ArticleFormComposition as ArticleForm };
