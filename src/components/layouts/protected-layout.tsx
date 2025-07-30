import { type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

import { LoadingPage } from "@/components/shared/loading";

import { useAppStatus } from "@/services/app/hooks";
import { RouteNames } from "@/services/app/route-names";
import { useUserStores } from "@/services/user/stores";

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
