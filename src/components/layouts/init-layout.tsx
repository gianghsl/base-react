import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { setAxiosToken } from "@/lib/axios";
import { AppActions } from "@/services/app/actions";
import { AppStatus, ReferralCodeQuery } from "@/services/app/constants";
import { useAppStore } from "@/services/app/stores";
import { UserActions } from "@/services/user/actions";
import { delay } from "@/utils";

function InitLayout({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();

  const { status } = useAppStore();

  const isInitialized = status === AppStatus.INITIALIZED;

  useEffect(() => {
    const init = async () => {
      const accessToken = AppActions.getAccessToken();

      await delay(100);

      if (accessToken) {
        setAxiosToken(accessToken);

        UserActions.GetMe()
          .then((r) => UserActions.setState({ user: r.payload }))
          .catch(() => {
            UserActions.setState({ user: null as any });
            AppActions.setAccessToken("");
            setAxiosToken("");
            return null;
          })
          .finally(() =>
            AppActions.setState({ status: AppStatus.INITIALIZED }),
          );
      } else {
        AppActions.setState({ status: AppStatus.INITIALIZED });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const referralCode = searchParams.get(ReferralCodeQuery);
    if (referralCode) AppActions.setLSReferralCode(referralCode);
  }, []);

  if (!isInitialized)
    return <div className="h-screen w-screen flex-center">...Loading</div>;
  return children;
}

export default InitLayout;
