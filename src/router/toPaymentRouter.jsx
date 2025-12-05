import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div className="loading">Loading....</div>;

const PaymentIndexPage = lazy(() =>
  import("../pages/payment/PaymentIndexPage")
);
const PaymentDetailPage = lazy(() =>
  import("../pages/payment/PaymentDetailPage")
);
const PaymentSuccessPage = lazy(() =>
  import("../pages/payment/PaymentSuccessPage")
);

const toPaymentRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to={"index"} />,
    },
    {
      path: "index",
      element: (
        <Suspense fallback={Loading}>
          <PaymentIndexPage />
        </Suspense>
      ),
    },
    {
      path: "detail/:id",
      element: (
        <Suspense fallback={Loading}>
          <PaymentDetailPage />
        </Suspense>
      ),
    },
    {
      path: "success",
      element: (
        <Suspense fallback={Loading}>
          <PaymentSuccessPage />
        </Suspense>
      ),
    },
  ];
};

export default toPaymentRouter;
