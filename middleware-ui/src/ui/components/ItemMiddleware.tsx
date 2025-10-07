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
        is_selected
          ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
          : "bg-gray-50 border-2 border-transparent"
      } rounded-md p-3 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 relative`}
      onClick={() => {
        setSelectedMiddleware(key_name);
      }}
    >
      <div className="absolute top-2 right-2">
        {status && <Badge label={status} variant={verifyStatus(status)} />}
      </div>
      <div className="flex items-center gap-2">
        {is_selected && (
          <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
        )}
        <div className="flex-1">
          <h4
            className={`font-medium ${
              is_selected ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {name}
          </h4>
          <p
            className={`text-sm ${
              is_selected ? "text-blue-700" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </li>
  );
}
