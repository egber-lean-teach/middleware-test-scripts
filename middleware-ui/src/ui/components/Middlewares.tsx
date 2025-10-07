import {
  CURRENT_MIDDLEWARES,
  type IMiddleware,
} from "../../utils/constants/middleware";
import ItemMiddleware from "./ItemMiddleware";

interface IMiddlewareProps {
  selectedMiddleware: string;
  setSelectedMiddleware: (middleware: string) => void;
}
export default function Middlewares({
  selectedMiddleware,
  setSelectedMiddleware,
}: IMiddlewareProps): React.ReactNode {
  return (
    <ul className="flex flex-col gap-4">
      {CURRENT_MIDDLEWARES.map((middleware: IMiddleware) => (
        <ItemMiddleware
          key={middleware.key_name}
          name={middleware.name}
          description={middleware.description}
          key_name={middleware.key_name}
          setSelectedMiddleware={setSelectedMiddleware}
          is_selected={selectedMiddleware === middleware.key_name}
          status={middleware.status}
        />
      ))}
    </ul>
  );
}
