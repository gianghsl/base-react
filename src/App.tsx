import { useMemo } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import { IntlProvider } from "use-intl";

import AppLayout from "@/components/layouts/app-layout";
import InitLayout from "@/components/layouts/init-layout";
import ProtectedLayout from "@/components/layouts/protected-layout";
import ScrollToTop from "@/components/layouts/scroll-to-top";
import DumbPage from "@/components/modules/dumb/index";
import HomePage from "@/components/modules/homepage/index";
import { Toaster } from "@/components/ui/sonner";

import { RouteNames } from "@/services/app/route-names.ts";

import en from "../messages/en.json";
import vi from "../messages/vi.json";

import { ThemeProvider } from "./components/providers/theme-provider";
import { AppActions } from "./services/app/actions.ts";
import { LocaleDefault } from "./services/app/i18n";

import "./App.css";

const router = createBrowserRouter([
  {
    path: RouteNames.Home,
    element: (
      <>
        <ScrollToTop />

        <Toaster />

        <InitLayout>
          <AppLayout />
        </InitLayout>
      </>
    ),
    children: [
      // PUBLIC
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: RouteNames.Dumb,
        element: <DumbPage />,
      },
      // PROTECTED
      {
        element: (
          <ProtectedLayout>
            <Outlet />
          </ProtectedLayout>
        ),
        children: [
          {
            path: RouteNames.Dumb,
            element: <DumbPage />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  const getLocale = AppActions.getLocale();

  const messages = useMemo(() => {
    if (getLocale === "vi") return vi;
    return en;
  }, [getLocale]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <HelmetProvider>
          <NuqsAdapter>
            <IntlProvider
              locale={getLocale || LocaleDefault}
              messages={messages}
            >
              <ThemeProvider>
                <RouterProvider router={router} />
              </ThemeProvider>
            </IntlProvider>
          </NuqsAdapter>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
