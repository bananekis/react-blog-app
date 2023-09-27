import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Articles } from "./pages/Articles";
import { ArticleDetail } from "./pages/ArticleDetail";
import { MyArticles } from "./pages/MyArticles";
import { ArticleEditor } from "./pages/ArticleEditor";
import { ArticleCreator } from "./pages/ArticleCreator";
import { EnsureLogin } from "./components/EnsureLogin";
import { RootPage } from "./components/RootPage";
import { Login } from "./pages/Login";
import { useEffect } from "react";
import { useUserLogin } from "./hooks/useUserLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/articles" />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "articles/:articleId",
        element: <ArticleDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-articles",
        element: (
          <EnsureLogin>
            <MyArticles />
          </EnsureLogin>
        ),
      },
      {
        path: "my-articles/:articleId",
        element: (
          <EnsureLogin>
            <ArticleEditor />
          </EnsureLogin>
        ),
      },
      {
        path: "my-articles/new",
        element: (
          <EnsureLogin>
            <ArticleCreator />
          </EnsureLogin>
        ),
      },
    ],
  },
]);

export const App = () => {
  const { loadUserSession } = useUserLogin();

  useEffect(() => {
    loadUserSession();
  }, [loadUserSession]);

  return <RouterProvider router={router} />;
};
