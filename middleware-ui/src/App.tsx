import { useState } from "react";
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
} from "./interfaces/dto/Response";
import { isEmbeddingResponse } from "./interfaces/dto/Response";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatEmbeddingResponse } from "./utils/formatEmbeddingResponse";
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
    IResponseData | IEmbeddingResponseData
  >({
    response: "",
    length: 0,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
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
    setError("");
    try {
      const response: IResponse | IResponseEmbedding =
        await service.postRequest(formValues, selectedMiddleware);
      if (Number(response.status) >= 400) {
        setError(response.message);
        setLoading(false);
        return;
      }
      setBackendResponse(response.data[0].content);
    } catch (error) {
      setError("Something went wrong");
      console.log("error", error);
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
                <Badge label={selectedMiddleware} />
              </div>
              <form
                action=""
                className="flex flex-col gap-2 "
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
              {error && <Badge variant="destructive" label={error} />}
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
        <div className="p-4 border border-gray-200 rounded-md h-auto lg:h-full w-full lg:w-1/3 flex flex-col gap-4 overflow-visible lg:overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="font-medium text-gray-500">RESPONSES</h2>
            <Button
              onClick={() => {
                setBackendResponse({ response: "", length: 0 });
                setFormValues(INITIAL_FORM_VALUES);
              }}
              color="destructive"
              type="button"
            >
              Clear All
            </Button>
          </div>
          {selectedMiddleware !== "google_V1" && (
            <>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium text-gray-500">AI Response:</h3>
                <div className="border border-gray-200 rounded-md p-2 h-[300px] sm:h-[350px] lg:flex-1 lg:min-h-0 overflow-y-auto text-sm text-gray-500 break-all overflow-wrap-anywhere whitespace-pre-wrap">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {isEmbeddingResponse(backendResponse) ? (
                        <div className="text-sm text-gray-600">
                          <p className="mb-2 font-medium">Embedding Vectors:</p>
                          {backendResponse.response.map((item, itemIndex) => (
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
                              <div className="bg-gray-50 p-2 rounded max-h-24 sm:max-h-32 overflow-y-auto font-mono text-xs">
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
                          ))}
                        </div>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {formatEmbeddingResponse(
                            backendResponse.response as string
                          )}
                        </ReactMarkdown>
                      )}
                      <p className="font-medium">
                        Length: {backendResponse.length}
                      </p>
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
    </div>
  );
}
