import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loading">Loading....</div>;

const OrderBestPage = lazy(() => import("../pages/order/OrderBestPage"));
const OrderWinePage = lazy(() => import("../pages/order/OrderWinePage"));
const OrderWhiskeyPage = lazy(() => import("../pages/order/OrderWhiskeyPage"));
const OrderVodkaPage = lazy(() => import("../pages/order/OrderVodkaPage"));
// const MainPage = lazy(() => import("../pages/MainPage"));
const OrderMain = lazy(() => import("../pages/OrderMain"));

const OrderAccessoriesPage = lazy(() =>
  import("../pages/order/OrderAccessoriesPage")
);
const OrderItemDetailPage = lazy(() =>
  import("../pages/order/OrderItemDetailPage")
);
const toOrdrRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="best" />,
    },
    {
      path: "main",
      element: (
        <Suspense fallback={Loading}>
          <OrderMain />
        </Suspense>
      ),
    },
    {
      path: "best",
      element: (
        <Suspense fallback={Loading}>
          <OrderBestPage />
        </Suspense>
      ),
    },
    {
      path: "wine",
      element: (
        <Suspense fallback={Loading}>
          <OrderWinePage />
        </Suspense>
      ),
    },
    {
      path: "whiskey",
      element: (
        <Suspense fallback={Loading}>
          <OrderWhiskeyPage />
        </Suspense>
      ),
    },
    {
      path: "vodka",
      element: (
        <Suspense fallback={Loading}>
          <OrderVodkaPage />
        </Suspense>
      ),
    },
    {
      path: "accessories",
      element: (
        <Suspense fallback={Loading}>
          <OrderAccessoriesPage />
        </Suspense>
      ),
    },
    {
      path: "itemdetail/:id",
      element: (
        <Suspense fallback={Loading}>
          <OrderItemDetailPage />
        </Suspense>
      ),
    },
  ];
};

export default toOrdrRouter;
