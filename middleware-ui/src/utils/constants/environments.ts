import type { ISelect } from "../../interfaces/select";

export const CURRENT_ENVIRONMENTS: ISelect[] = [
  { label: "QA", value: "https://api.qa.hcapp.io/meter" },
  { label: "DEV", value: "https://api.dev.hcapp.io/meter" },
  { label: "UAT", value: "https://api.uat.revenium.io/meter" },
  { label: "PROD", value: "https://api.revenium/meter" },
];
