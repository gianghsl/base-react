import { type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

import { useAppStatus } from "@/services/app/hooks";
import { RouteNames } from "@/services/app/route-names";
import { useUserStores } from "@/services/user/stores";

import { LoadingPage } from "../loading";

function ProtectedLayout({ children }: PropsWithChildren) {
  const { isInitialized } = useAppStatus();
  const { user } = useUserStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !user?._id) {
      navigate(RouteNames.Home, { replace: true });
    }
  }, [isInitialized, user?._id]);

  if (!isInitialized) return <LoadingPage />;

  if (!user) {
    return <LoadingPage />;
  }

  return children;
}

export default ProtectedLayout;
