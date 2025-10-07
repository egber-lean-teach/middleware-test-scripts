interface ToastProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

export default function Toast({
  isVisible,
  message,
  onClose,
  type = "success",
}: ToastProps) {
  console.log(
    "🍞 Toast render - isVisible:",
    isVisible,
    "message:",
    message,
    "type:",
    type
  );

  if (!isVisible) return null;

  const isError = type === "error";
  const bgColor = isError ? "bg-red-600" : "bg-green-600";
  const borderColor = isError ? "border-red-500" : "border-green-500";
  const iconBgColor = isError ? "bg-red-500" : "bg-green-500";
  const hoverColor = isError ? "hover:text-red-200" : "hover:text-green-200";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div
        className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg max-w-sm flex items-center gap-3 border ${borderColor}`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
          >
            {isError ? (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`text-white ${hoverColor} transition-colors ml-2`}
          aria-label="Close notification"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
