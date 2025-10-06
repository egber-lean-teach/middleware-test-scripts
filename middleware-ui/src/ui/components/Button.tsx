import { VARIANT_CLASS } from "../../utils/constants/variantClass";

interface IButtonProps {
  children: React.ReactNode;
  type: "submit" | "button";
  color?: "primary" | "secondary" | "destructive";
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button({
  children,
  type,
  color,
  disabled,
  onClick,
}: IButtonProps): React.ReactNode {
  return (
    <button
      className={`outline-none p-2 rounded-md ${
        VARIANT_CLASS[color || "primary"]
      } cursor-pointer transition-colors duration-200`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
