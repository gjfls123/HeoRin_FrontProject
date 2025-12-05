import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import toOrdrRouter from "./toOrdrRouter";
import toAuthRouter from "./toAuthRouter";
import toAdminRouter from "./toAdminRouter";
import toCartRouter from "./toCartRouter";
import toPaymentRouter from "./toPaymentRouter";

const Loading = <div className="loading">Loading....</div>;

// index page
const IndexPage = lazy(() => import("../pages/IndexPage"));

// main page
const MainPage = lazy(() => import("../pages/MainPage"));

// order pages
const OrderLayout = lazy(() => import("../layout/OrderLayout"));
const OrderBestPage = lazy(() => import("../pages/order/OrderBestPage"));
const OrderWinePage = lazy(() => import("../pages/order/OrderWinePage"));
const OrderWhiskeyPage = lazy(() => import("../pages/order/OrderWhiskeyPage"));
const OrderVodkaPage = lazy(() => import("../pages/order/OrderVodkaPage"));
const OrderAccessoriesPage = lazy(() =>
  import("../pages/order/OrderAccessoriesPage")
);

// auth pages
const AuthLayout = lazy(() => import("../layout/AuthLayout"));
const AuthLoginPage = lazy(() => import("../pages/auth/AuthLoginPage"));
const AuthJoinPage = lazy(() => import("../pages/auth/AuthJoinPage"));
const AuthDetailPage = lazy(() => import("../pages/auth/AuthDetailPage"));

// admin pages
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const AdminMemberListPage = lazy(() =>
  import("../pages/admin/AdminMemberListPage")
);
const AdminMemberDetailPage = lazy(() =>
  import("../pages/admin/AdminMemberDetailPage")
);
const AdminItemListPage = lazy(() =>
  import("../pages/admin/AdminItemListPage")
);
const AdminItemDetailPage = lazy(() =>
  import("../pages/admin/AdminItemDetailPage")
);

// cart pages
const CartLayout = lazy(() => import("../layout/CartLayout"));
const CartIndexPage = lazy(() => import("../pages/cart/CartIndexPage"));
const CartDetailPage = lazy(() => import("../pages/cart/CartDetailPage"));

// payment pages
const PaymentLayout = lazy(() => import("../layout/PaymentLayout"));
const PaymentIndexPage = lazy(() =>
  import("../pages/payment/PaymentIndexPage")
);
const PaymentDetailPage = lazy(() =>
  import("../pages/payment/PaymentDetailPage")
);

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <IndexPage />
      </Suspense>
    ),
  },
  {
    path: "/main",
    element: (
      <Suspense fallback={Loading}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/order",
    element: (
      <Suspense fallback={Loading}>
        <OrderLayout />
      </Suspense>
    ),
    children: toOrdrRouter(),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={Loading}>
        <AuthLayout />
      </Suspense>
    ),
    children: toAuthRouter(),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={Loading}>
        <AdminLayout />
      </Suspense>
    ),
    children: toAdminRouter(),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={Loading}>
        <CartLayout />
      </Suspense>
    ),
    children: toCartRouter(),
  },
  {
    path: "/payment",
    element: (
      <Suspense fallback={Loading}>
        <PaymentLayout />
      </Suspense>
    ),
    children: toPaymentRouter(),
  },
]);

export default root;
