import { VARIANT_CLASS } from "../../utils/constants/variantClass";

interface IBadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "destructive" | "success" | "warning";
}
export default function Badge({ label, variant }: IBadgeProps) {
  return (
    <div
      className={`text-sm p-1 rounded-md ${
        VARIANT_CLASS[variant || "secondary"]
      }`}
    >
      {label}
    </div>
  );
}
