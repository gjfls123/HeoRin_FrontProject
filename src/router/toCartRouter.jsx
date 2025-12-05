import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loading">Loading....</div>;

const CartIndexPage = lazy(() => import("../pages/cart/CartIndexPage"));
const CartDetailPage = lazy(() => import("../pages/cart/CartDetailPage"));

const toCartRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="index" />,
    },
    {
      path: "index",
      element: (
        <Suspense fallback={Loading}>
          <CartIndexPage />
        </Suspense>
      ),
    },
    {
      path: "detail",
      element: (
        <Suspense fallback={Loading}>
          <CartDetailPage />
        </Suspense>
      ),
    },
  ];
};

export default toCartRouter;
