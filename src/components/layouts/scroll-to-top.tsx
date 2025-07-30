import React from "react";
import { useLocation } from "react-router";

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname]);

  return null;
}

export default ScrollToTop;
