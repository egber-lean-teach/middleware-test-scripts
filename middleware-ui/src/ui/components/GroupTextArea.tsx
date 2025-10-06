import type { IFormValues } from "../../interfaces/formValues";

interface IGroupTextAreaProps {
  label: string;
  setFormValues: (values: IFormValues) => void;
  formValues: IFormValues;
}
export default function GroupTextArea({
  label,
  formValues,
  setFormValues,
}: IGroupTextAreaProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-gray-500 font-medium">
        {label}
      </label>
      <textarea
        name=""
        id=""
        rows={5}
        maxLength={500}
        value={formValues.prompt}
        className="border border-gray-200 rounded-md p-2 h-[80px] focus:outline-none focus:border-blue-500 text-sm text-gray-500"
        placeholder="Enter your prompt..."
        onChange={(e) => {
          setFormValues({ ...formValues, prompt: e.target.value });
        }}
      ></textarea>
    </div>
  );
}
