import "use-intl";

import messages from "./messages/en.json";
import { Locales } from "./src/services/app/i18n";

declare module "use-intl" {
  interface AppConfig {
    Locale: (typeof Locales)[number];
    Messages: typeof messages;
  }
}
