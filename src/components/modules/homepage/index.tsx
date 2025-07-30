import { Link } from "react-router-dom";
import { useTranslations } from "use-intl";

import AppIcon from "@/components/app/app-icon";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AppActions } from "@/services/app/actions";
import { Locale, LocaleDefault, Locales } from "@/services/app/i18n";
import { RouteNames } from "@/services/app/route-names";
import { Theme } from "@/services/app/types";

function HomePage() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations();
  const locale = AppActions.getLocale() || "";
  return (
    <div>
      <Select
        onValueChange={(value) => {
          setTheme(value as Theme);
        }}
        defaultValue={theme}
      >
        <SelectTrigger className="w-[12.5rem]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          AppActions.setLocale(value);
          window.location.reload();
        }}
        defaultValue={Locales.includes(locale) ? locale : LocaleDefault}
      >
        <SelectTrigger className="w-[12.5rem]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={Locale.Vi}>Vietnamese</SelectItem>
          <SelectItem value={Locale.En}>English</SelectItem>
        </SelectContent>
      </Select>

      {t("Hello")}

      <p>
        <Link to={RouteNames.Dumb}>Dumb</Link>
      </p>
      <p>
        <Link to={RouteNames.Home}>Home</Link>
      </p>

      <AppIcon src="/public/favicon.svg" width={50} />
    </div>
  );
}

export default HomePage;
