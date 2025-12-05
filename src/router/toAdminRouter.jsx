import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loading">Loading....</div>;

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
const AdminOrderPaymentPage = lazy(() =>
  import("../pages/admin/AdminOrderPaymentPage")
);
const AdminOrderLocationPage = lazy(() =>
  import("../pages/admin/AdminOrderLocationPage")
);

const toAdminRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="memberlist" />,
    },
    {
      path: "memberlist",
      element: (
        <Suspense fallback={Loading}>
          <AdminMemberListPage />
        </Suspense>
      ),
    },
    {
      path: "memberdetail",
      element: (
        <Suspense fallback={Loading}>
          <AdminMemberDetailPage />
        </Suspense>
      ),
    },
    {
      path: "itemlist",
      element: (
        <Suspense fallback={Loading}>
          <AdminItemListPage />
        </Suspense>
      ),
    },
    {
      path: "itemdetail",
      element: (
        <Suspense fallback={Loading}>
          <AdminItemDetailPage />
        </Suspense>
      ),
    },
    {
      path: "orderpayment",
      element: (
        <Suspense fallback={Loading}>
          <AdminOrderPaymentPage />
        </Suspense>
      ),
    },
    {
      path: "orderlocation",
      element: (
        <Suspense fallback={Loading}>
          <AdminOrderLocationPage />
        </Suspense>
      ),
    },
  ];
};
export default toAdminRouter;
