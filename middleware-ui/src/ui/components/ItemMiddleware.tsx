import { verifyStatus } from "../../utils/verifyStatus";
import Badge from "./Badge";

interface IItemMiddlewareProps {
  name: string;
  description: string;
  key_name: string;
  setSelectedMiddleware: (middleware: string) => void;
  is_selected: boolean;
  status: string;
}
export default function ItemMiddleware({
  name,
  description,
  key_name,
  is_selected,
  status,
  setSelectedMiddleware,
}: IItemMiddlewareProps): React.ReactNode {
  return (
    <li
      className={`${
        is_selected ? "bg-gray-100" : "bg-gray-50"
      } rounded-md p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 relative`}
      onClick={() => {
        setSelectedMiddleware(key_name);
      }}
    >
      <div className="absolute top-2 right-2">
        {status && <Badge label={status} variant={verifyStatus(status)} />}
      </div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </li>
  );
}
