import { useState, useEffect, useMemo } from "react";
import Middlewares from "./ui/components/Middlewares";
import { CURRENT_MIDDLEWARES } from "./utils/constants/middleware";
import GroupSelect from "./ui/components/GroupSelect";
import { CURRENT_TYPES } from "./utils/constants/types";
import { CURRENT_GOOGLE_MODELS } from "./utils/constants/google-models";
import { CURRENT_ENVIRONMENTS } from "./utils/constants/environments";
import GroupTextArea from "./ui/components/GroupTextArea";
import Button from "./ui/components/Button";
import type { IFormValues } from "./interfaces/formValues";
import { INITIAL_FORM_VALUES } from "./utils/constants/formValues";
import Badge from "./ui/components/Badge";
import type {
  IResponse,
  IResponseData,
  IEmbeddingResponseData,
  IAllResponseData,
} from "./interfaces/dto/Response";
import { isEmbeddingResponse, isAllResponse } from "./interfaces/dto/Response";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatEmbeddingResponse } from "./utils/formatEmbeddingResponse";
import {
  useMultipleTypingEffect,
  useTypingEffect,
} from "./hooks/useTypingEffect";
import TypingCursor from "./ui/components/TypingCursor";
import Toast from "./ui/components/Toast";
import {
  EmbeddingValuesSkeleton,
  TextResponseSkeleton,
} from "./ui/components/Skeleton";
import { service } from "./services/Service";
import type { IResponseEmbedding } from "./interfaces/dto/ResponseEmbedding";
import { CURRENT_PERPLEXITY_MODELS } from "./utils/constants/perplexity-models";

export default function App() {
  const [selectedMiddleware, setSelectMiddleware] = useState<string>(
    CURRENT_MIDDLEWARES[0].key_name
  );
  const [formValues, setFormValues] =
    useState<IFormValues>(INITIAL_FORM_VALUES);
  const [backendResponse, setBackendResponse] = useState<
    IResponseData | IEmbeddingResponseData | IAllResponseData
  >({
    response: "",
    length: 0,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showReveniumMessage, setShowReveniumMessage] =
    useState<boolean>(false);
  const [hasNewResponse, setHasNewResponse] = useState<boolean>(false);
  const [isResettingForm, setIsResettingForm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

  // Function to extract error message from backend response
  const extractErrorMessage = (error: unknown): string => {
    try {
      console.log("🔍 Extracting error message from:", error);

      // Type guard for axios error
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
            data?: Array<{ content?: string }>;
          };
        };
        message?: string;
      };

      // Check if it's an axios error with response data
      if (axiosError?.response?.data) {
        const data = axiosError.response.data;
        console.log("📦 Response data:", data);

        // Check if data has the structure with content array
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const content = data.data[0].content;
          console.log("📝 Extracted content:", content);
          if (typeof content === "string") {
            return content;
          }
        }

        // Fallback to message if available
        if (data.message) {
          console.log("💬 Using message:", data.message);
          return data.message;
        }
      }

      // Fallback to error message if available
      if (axiosError?.message) {
        console.log("⚠️ Using error message:", axiosError.message);
        return axiosError.message;
      }

      console.log("❌ Using fallback message");
      return "An unexpected error occurred";
    } catch (extractError) {
      console.log("🚨 Error in extractErrorMessage:", extractError);
      return "An unexpected error occurred";
    }
  };

  // Check if we're in streaming mode
  const isStreamingMode = formValues.type === "streams";

  // Memoize texts object to prevent infinite re-renders
  const multipleTexts = useMemo(() => {
    if (isAllResponse(backendResponse)) {
      return {
        googleResult: backendResponse.response.googleResult || "",
        vertexResult: backendResponse.response.vertexResult || "",
        perplexityResult: backendResponse.response.perplexityResult || "",
      };
    }
    return {
      googleResult: "",
      vertexResult: "",
      perplexityResult: "",
    };
  }, [backendResponse]);

  // Typing effects for different response types
  const multipleTypingEffect = useMultipleTypingEffect({
    texts: multipleTexts,
    speed: 25,
    enabled:
      isStreamingMode &&
      selectedMiddleware === "all" &&
      isAllResponse(backendResponse) &&
      !loading,
  });

  const singleTypingEffect = useTypingEffect({
    text:
      !isAllResponse(backendResponse) &&
      !isEmbeddingResponse(backendResponse) &&
      (backendResponse as IResponseData).response
        ? (backendResponse as IResponseData).response
        : "",
    speed: 25,
    enabled:
      isStreamingMode &&
      selectedMiddleware !== "all" &&
      !isAllResponse(backendResponse) &&
      !isEmbeddingResponse(backendResponse) &&
      !loading &&
      (backendResponse as IResponseData).response !== "",
  });

  // Reset states when middleware changes
  useEffect(() => {
    setBackendResponse({ response: "", length: 0 });
    setError("");
    setShowReveniumMessage(false);
    setHasNewResponse(false);
    setIsResettingForm(false);
    setShowErrorToast(false);
    setErrorMessage("");
  }, [selectedMiddleware]);

  // Show Revenium message when typing is complete
  useEffect(() => {
    // Don't show toast if there's no valid response, if we're loading, or if this isn't a new response
    if (loading || !backendResponse || !hasNewResponse) return;

    // Check if we have actual content (not just empty initial state)
    const hasValidContent =
      (isAllResponse(backendResponse) &&
        (backendResponse.response.googleResult?.trim() ||
          backendResponse.response.vertexResult?.trim() ||
          backendResponse.response.perplexityResult?.trim())) ||
      (!isAllResponse(backendResponse) &&
        !isEmbeddingResponse(backendResponse) &&
        (backendResponse as IResponseData).response?.trim()) ||
      (isEmbeddingResponse(backendResponse) &&
        (backendResponse as IEmbeddingResponseData).response?.length > 0);

    if (!hasValidContent) return;

    if (isStreamingMode) {
      // For streaming mode, wait until typing is complete
      const isTypingComplete =
        selectedMiddleware === "all"
          ? !multipleTypingEffect.isTyping && isAllResponse(backendResponse)
          : !singleTypingEffect.isTyping &&
            !isAllResponse(backendResponse) &&
            !isEmbeddingResponse(backendResponse);

      if (isTypingComplete) {
        setShowReveniumMessage(true);
        setHasNewResponse(false); // Reset flag after showing toast
        const timer = setTimeout(() => {
          setShowReveniumMessage(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    } else {
      // For non-streaming mode, show message immediately when we have content
      setShowReveniumMessage(true);
      setHasNewResponse(false); // Reset flag after showing toast
      const timer = setTimeout(() => {
        setShowReveniumMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [
    isStreamingMode,
    loading,
    multipleTypingEffect.isTyping,
    singleTypingEffect.isTyping,
    backendResponse,
    selectedMiddleware,
    hasNewResponse,
  ]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Clear all states when starting a new request
    setLoading(true);
    setError("");
    setShowReveniumMessage(false);
    setBackendResponse({ response: "", length: 0 });
    setShowErrorToast(false);
    setErrorMessage("");
    setHasNewResponse(false);
    setIsResettingForm(false);

    if (
      !formValues.environment ||
      !formValues.model ||
      !formValues.prompt ||
      !formValues.type
    ) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      const response: IResponse | IResponseEmbedding =
        await service.postRequest(formValues, selectedMiddleware);
      if (Number(response.status) >= 400) {
        setError(response.message);
        setLoading(false);
        return;
      }
      setBackendResponse(response.data[0].content);
      setHasNewResponse(true);

      // Auto-reset form after successful response for easy next request
      // Small delay to let user see the success before form resets
      setIsResettingForm(true);
      setTimeout(() => {
        // Keeps: selectedMiddleware, backendResponse (AI response visible)
        // Resets: all form fields (selects back to "Select", prompt empty)
        setFormValues(INITIAL_FORM_VALUES);
        setIsResettingForm(false);
      }, 800); // 800ms delay for better UX
    } catch (error) {
      const errorMsg = extractErrorMessage(error);
      console.log("🎯 Final error message for toast:", errorMsg);

      setErrorMessage(errorMsg);
      setShowErrorToast(true);

      console.log(
        "🍞 Toast state set - showErrorToast: true, errorMessage:",
        errorMsg
      );

      // Clear the old error state when showing toast (so badge doesn't show)
      setError("");
      console.log("error", error);

      // Auto-hide error toast after 7 seconds
      setTimeout(() => {
        setShowErrorToast(false);
        console.log("🍞 Toast auto-hidden after 7 seconds");
      }, 7000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-screen p-4 md:p-6 lg:p-10 lg:overflow-hidden">
      <header className="mb-4 md:mb-6">
        <div className="flex items-center">
          <img
            src="/horizontalcolor10.png"
            alt="Logo"
            className="h-6 md:h-6 lg:h-6 w-auto"
          />
        </div>
      </header>
      <main className="h-full w-full flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="p-4 border border-gray-200 rounded-md h-auto lg:h-full w-full lg:w-1/3 flex flex-col gap-4 overflow-visible lg:overflow-hidden">
          <h2 className="font-medium text-gray-500">MIDDLEWARES</h2>
          <Middlewares
            selectedMiddleware={selectedMiddleware}
            setSelectedMiddleware={setSelectMiddleware}
          />
        </div>
        <div className="p-4 border border-gray-200 rounded-md h-auto lg:h-full w-full lg:w-1/3 flex flex-col gap-3 overflow-visible lg:overflow-hidden">
          <h2 className="font-medium text-gray-500">REQUEST</h2>
          {selectedMiddleware !== "google_V1" && (
            <>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-gray-500">
                  Selected middleware
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Badge label={selectedMiddleware} variant="primary" />
                </div>
              </div>

              {/* Form reset indicator */}
              {isResettingForm && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Form resetting for next request...</span>
                </div>
              )}

              <form
                action=""
                className={`flex flex-col gap-2 ${
                  isResettingForm ? "opacity-50 pointer-events-none" : ""
                }`}
                onSubmit={handleSubmit}
              >
                <GroupSelect
                  label="Type"
                  values={
                    selectedMiddleware === "perplexity"
                      ? CURRENT_TYPES.filter(
                          (type) => type.value !== "embeddings"
                        )
                      : CURRENT_TYPES
                  }
                  name="type"
                  setFormValues={setFormValues}
                  formValues={formValues}
                />
                <GroupSelect
                  label="Model"
                  values={
                    selectedMiddleware === "perplexity"
                      ? CURRENT_PERPLEXITY_MODELS
                      : CURRENT_GOOGLE_MODELS
                  }
                  name="model"
                  setFormValues={setFormValues}
                  formValues={formValues}
                />
                <GroupSelect
                  label="Environment"
                  values={CURRENT_ENVIRONMENTS}
                  name="environment"
                  setFormValues={setFormValues}
                  formValues={formValues}
                />
                <GroupTextArea
                  label="Prompt"
                  setFormValues={setFormValues}
                  formValues={formValues}
                />
                <Button disabled={loading} type="submit">
                  {loading ? "Loading..." : "Send"}
                </Button>
              </form>
              {error && !showErrorToast && (
                <Badge variant="destructive" label={error} />
              )}
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-gray-500">Values</h3>
                <div className="flex flex-col gap-2">
                  {Object.keys(formValues).map((key) => (
                    <Badge
                      key={key}
                      label={formValues[key as keyof IFormValues]}
                      variant="secondary"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-4 border border-gray-200 rounded-md h-auto lg:h-full w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="font-medium text-gray-500">RESPONSES</h2>
            <Button
              onClick={() => {
                // Clear everything: form, response, errors, and toast
                setFormValues(INITIAL_FORM_VALUES);
                setBackendResponse({ response: "", length: 0 });
                setError("");
                setShowReveniumMessage(false);
                setHasNewResponse(false);
                setIsResettingForm(false);
                setShowErrorToast(false);
                setErrorMessage("");
                // Keep: selectedMiddleware (user's choice remains)
              }}
              color="secondary"
              type="button"
            >
              Clear All
            </Button>
          </div>
          {selectedMiddleware !== "google_V1" && (
            <>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-gray-500">AI Response:</h3>
                <div className="border border-gray-200 rounded-md p-4 h-[500px] overflow-y-auto text-sm text-gray-500 break-words whitespace-pre-wrap">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {selectedMiddleware === "all" &&
                      isAllResponse(backendResponse) ? (
                        <div className="text-sm text-gray-600">
                          {/* Google Result */}
                          <div className="mb-4 border border-blue-200 rounded p-3 bg-blue-50">
                            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                              Google AI Result
                            </h4>
                            <div className="bg-white p-3 rounded text-gray-700">
                              {loading ||
                              !backendResponse.response.googleResult ? (
                                <TextResponseSkeleton />
                              ) : (
                                <div className="relative">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {isStreamingMode
                                      ? multipleTypingEffect.displayedTexts
                                          .googleResult || "No response"
                                      : backendResponse.response.googleResult ||
                                        "No response"}
                                  </ReactMarkdown>
                                  <TypingCursor
                                    isVisible={
                                      isStreamingMode &&
                                      multipleTypingEffect.isTyping
                                    }
                                  />
                                </div>
                              )}
                              {!loading && (
                                <p className="text-xs text-gray-500 mt-2 border-t pt-2">
                                  Length: {backendResponse.length.googleResult}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Vertex Result */}
                          <div className="mb-4 border border-green-200 rounded p-3 bg-green-50">
                            <h4 className="font-medium text-green-800 mb-2 flex items-center">
                              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                              Vertex AI Result
                            </h4>
                            <div className="bg-white p-3 rounded text-gray-700">
                              {loading ||
                              !backendResponse.response.vertexResult ? (
                                <TextResponseSkeleton />
                              ) : (
                                <div className="relative">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {isStreamingMode
                                      ? multipleTypingEffect.displayedTexts
                                          .vertexResult || "No response"
                                      : backendResponse.response.vertexResult ||
                                        "No response"}
                                  </ReactMarkdown>
                                  <TypingCursor
                                    isVisible={
                                      isStreamingMode &&
                                      multipleTypingEffect.isTyping
                                    }
                                  />
                                </div>
                              )}
                              {!loading && (
                                <p className="text-xs text-gray-500 mt-2 border-t pt-2">
                                  Length: {backendResponse.length.vertexResult}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Perplexity Result */}
                          <div className="mb-4 border border-purple-200 rounded p-3 bg-purple-50">
                            <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                              Perplexity AI Result
                            </h4>
                            <div className="bg-white p-3 rounded text-gray-700">
                              {loading ||
                              !backendResponse.response.perplexityResult ? (
                                <TextResponseSkeleton />
                              ) : (
                                <div className="relative">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {isStreamingMode
                                      ? multipleTypingEffect.displayedTexts
                                          .perplexityResult || "No response"
                                      : backendResponse.response
                                          .perplexityResult || "No response"}
                                  </ReactMarkdown>
                                  <TypingCursor
                                    isVisible={
                                      isStreamingMode &&
                                      multipleTypingEffect.isTyping
                                    }
                                  />
                                </div>
                              )}
                              {!loading && (
                                <p className="text-xs text-gray-500 mt-2 border-t pt-2">
                                  Length:{" "}
                                  {backendResponse.length.perplexityResult}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : isEmbeddingResponse(backendResponse) ? (
                        <div className="text-sm text-gray-600">
                          <p className="mb-2 font-medium">Embedding Vectors:</p>
                          {loading ||
                          !backendResponse.response ||
                          backendResponse.response.length === 0 ? (
                            <EmbeddingValuesSkeleton />
                          ) : (
                            backendResponse.response.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="mb-4 border border-gray-100 rounded p-2 sm:p-3"
                              >
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                                  <h4 className="font-medium">
                                    Vector {itemIndex + 1}
                                  </h4>
                                  {item.statistics && (
                                    <span className="text-xs text-gray-500">
                                      Tokens: {item.statistics.tokenCount} |
                                      Truncated:{" "}
                                      {item.statistics.truncated ? "Yes" : "No"}
                                    </span>
                                  )}
                                </div>
                                <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                                  {item.values.map((value, valueIndex) => (
                                    <span
                                      key={valueIndex}
                                      className="inline-block mr-2 mb-1"
                                    >
                                      {value.toFixed(6)}
                                      {valueIndex < item.values.length - 1
                                        ? ","
                                        : ""}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Dimensions: {item.values.length}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          {loading ||
                          !(backendResponse as IResponseData).response ? (
                            <TextResponseSkeleton />
                          ) : (
                            <>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {isStreamingMode
                                  ? singleTypingEffect.displayedText ||
                                    formatEmbeddingResponse(
                                      (backendResponse as IResponseData)
                                        .response as string
                                    )
                                  : formatEmbeddingResponse(
                                      (backendResponse as IResponseData)
                                        .response as string
                                    )}
                              </ReactMarkdown>
                              <TypingCursor
                                isVisible={
                                  isStreamingMode && singleTypingEffect.isTyping
                                }
                              />
                            </>
                          )}
                        </div>
                      )}

                      {selectedMiddleware !== "all" &&
                        !isAllResponse(backendResponse) && (
                          <p className="font-medium">
                            Length:{" "}
                            {
                              (
                                backendResponse as
                                  | IResponseData
                                  | IEmbeddingResponseData
                              ).length
                            }
                          </p>
                        )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 sm:p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    ⚠️ Revenium Configuration
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    To verify Revenium, make sure the following variables are
                    configured in the backend{" "}
                    <code className="bg-yellow-100 px-1 rounded">.env</code>{" "}
                    file:
                  </p>
                  <ul className="mt-2 text-yellow-700 text-sm list-disc list-inside space-y-1">
                    <li>
                      <code className="bg-yellow-100 px-1 rounded">
                        REVENIUM_METERING_API_KEY
                      </code>
                    </li>
                    <li>
                      <code className="bg-yellow-100 px-1 rounded">
                        REVENIUM_METERING_BASE_URL
                      </code>
                    </li>
                  </ul>
                  <p className="mt-2 text-yellow-700 text-sm font-medium">
                    ⚠️ Important: Both variables must correspond to the same
                    environment (dev, uat, production and qa).
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Success Toast notification */}
      <Toast
        isVisible={showReveniumMessage}
        message="✅ Response completed! Check the Revenium UI to verify the data was received."
        onClose={() => setShowReveniumMessage(false)}
        type="success"
      />

      {/* Error Toast notification */}
      <Toast
        isVisible={showErrorToast}
        message={errorMessage}
        onClose={() => setShowErrorToast(false)}
        type="error"
      />
    </div>
  );
}
