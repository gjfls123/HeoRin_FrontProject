import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loading">Loading....</div>;

const AuthLoginPage = lazy(() => import("../pages/auth/AuthLoginPage"));
const AuthJoinPage = lazy(() => import("../pages/auth/AuthJoinPage"));
const AuthDetailPage = lazy(() => import("../pages/auth/AuthDetailPage"));

const toAuthRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="login" />,
    },
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <AuthLoginPage />
        </Suspense>
      ),
    },
    {
      path: "join",
      element: (
        <Suspense fallback={Loading}>
          <AuthJoinPage />
        </Suspense>
      ),
    },
    {
      path: "detail",
      element: (
        <Suspense fallback={Loading}>
          <AuthDetailPage />
        </Suspense>
      ),
    },
  ];
};
export default toAuthRouter;
