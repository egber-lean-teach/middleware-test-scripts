interface IVariantClass {
  primary: string;
  secondary: string;
  destructive: string;
  success: string;
  warning: string;
}
export const VARIANT_CLASS: IVariantClass = {
  primary: "bg-blue-100 text-blue-800 border border-blue-200",
  secondary: "bg-gray-100 text-gray-700 border border-gray-200",
  destructive: "bg-red-50 text-red-700 border border-red-200",
  success: "bg-green-50 text-green-700 border border-green-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
};
