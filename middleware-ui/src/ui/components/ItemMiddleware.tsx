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
      } rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 relative`}
      onClick={() => {
        setSelectedMiddleware(key_name);
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          {is_selected && (
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h4
                className={`font-medium ${
                  is_selected ? "text-blue-900" : "text-gray-900"
                }`}
              >
                {name}
              </h4>
              {status && (
                <Badge label={status} variant={verifyStatus(status)} />
              )}
            </div>
            <p
              className={`text-sm ${
                is_selected ? "text-blue-700" : "text-gray-500"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
