import { GetAccessToken } from "../types/GetAccessToken";
import { FC, ReactNode, createContext, useContext, useMemo } from "react";
import { useAppSelector } from "../hooks/redux";
import { HttpClient, createHttpClient } from "./httpClient";
import { articlesSchema } from "../schemas/articlesSchema";
import { Article } from "../schemas/articleSchema";
import { ArticleDetail, articleDetailSchema } from "../schemas/articleDetailSchema";
import { AccessToken, accessTokenSchema } from "../schemas/accessTokenSchema";
import { ArticleComment, articleCommentSchema } from "../schemas/articleCommentSchema";
import { ImageInfo } from "../schemas/imageInfoSchema";
import { imageInfosSchema } from "../schemas/imageInfosSchema";

export type ArticleServerModel = Pick<ArticleDetail, "content" | "imageId" | "perex" | "title">;

export type UserCredentialsServerModel = {
  readonly username: string;
  readonly password: string;
};

export type NewCommentServerModel = {
  readonly articleId: string;
  readonly author: string;
  readonly content: string;
};

export const createApiClient = (httpClient: HttpClient) => ({
  logIn: async (credentials: UserCredentialsServerModel): Promise<AccessToken> => {
    const response = await httpClient.post("login", credentials);

    return accessTokenSchema.parse(response);
  },

  articles: {
    getList: async (): Promise<ReadonlyArray<Article>> => {
      const response = await httpClient.get("articles");

      return articlesSchema.parse(response).items;
    },

    getDetail: async (articleId: string): Promise<ArticleDetail> => {
      const response = await httpClient.get(`articles/${articleId}`);

      return articleDetailSchema.parse(response);
    },

    create: async (article: ArticleServerModel): Promise<ArticleDetail> => {
      const response = await httpClient.post("articles", article);

      return articleDetailSchema.parse(response);
    },

    update: async (articleId: string, article: ArticleServerModel): Promise<ArticleDetail> => {
      const response = await httpClient.patch(`articles/${articleId}`, article);

      return articleDetailSchema.parse(response);
    },

    delete: async (articleId: string): Promise<void> => {
      await httpClient.delete(`articles/${articleId}`);
    },
  },

  comments: {
    add: async (comment: NewCommentServerModel): Promise<ArticleComment> => {
      const response = await httpClient.post("comments", comment);

      return articleCommentSchema.parse(response);
    },

    upvote: async (commentId: string): Promise<ArticleComment> => {
      const response = await httpClient.post(`comments/${commentId}/vote/up`);

      return articleCommentSchema.parse(response);
    },

    downvote: async (commentId: string): Promise<ArticleComment> => {
      const response = await httpClient.post(`comments/${commentId}/vote/down`);

      return articleCommentSchema.parse(response);
    },
  },

  images: {
    upload: async (imageFile: Blob): Promise<ImageInfo | null> => {
      const response = await httpClient.uploadFile("images", imageFile);
      const imageInfos = imageInfosSchema.parse(response);

      return imageInfos[0] ?? null;
    },

    get: async (imageId: string): Promise<Blob> => {
      return (await httpClient.downloadFile(`images/${imageId}`)) as Blob;
    },

    delete: async (imageId: string): Promise<void> => {
      await httpClient.delete(`images/${imageId}`);
    },
  },
});

export type ApiClient = ReturnType<typeof createApiClient>;

const ApiClientContext = createContext<ApiClient | null>(null);

export const useApiClient = () => {
  const apiClient = useContext(ApiClientContext);

  if (!apiClient) {
    throw new Error(`${__filename}:ApiClient provider is missing.`);
  }

  return apiClient;
};

type ApiClientProviderProps = {
  readonly children: ReactNode;
};

export const ApiClientProvider: FC<ApiClientProviderProps> = ({ children }) => {
  const accessToken = useAppSelector((s) => s.user?.accessToken?.access_token ?? null);

  const apiClient = useMemo(() => {
    const getAccessToken: GetAccessToken = () => accessToken;
    const httpClient = createHttpClient(getAccessToken);

    return createApiClient(httpClient);
  }, [accessToken]);

  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>;
};

ApiClientProvider.displayName = "ApiClientProvider";
