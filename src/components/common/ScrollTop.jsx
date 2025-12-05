import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const location = useLocation();

  useEffect(() => {
    console.log("location.pathname changed:", location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
