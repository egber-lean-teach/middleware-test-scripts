interface IVariantClass {
  primary: string;
  secondary: string;
  destructive: string;
  success: string;
  warning: string;
}
export const VARIANT_CLASS: IVariantClass = {
  primary: "bg-black/70 text-white hover:bg-black/80 ",
  secondary: "bg-gray-100",
  destructive: "bg-red-400 text-white",
  success: "bg-green-300 text-white",
  warning: "bg-yellow-400",
};
