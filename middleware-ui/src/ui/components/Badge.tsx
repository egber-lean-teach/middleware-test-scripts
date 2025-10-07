import { VARIANT_CLASS } from "../../utils/constants/variantClass";

interface IBadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "destructive" | "success" | "warning";
}
export default function Badge({ label, variant }: IBadgeProps) {
  return (
    <div
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        VARIANT_CLASS[variant || "secondary"]
      }`}
    >
      {label}
    </div>
  );
}
