import type { IFormValues } from "../../interfaces/formValues";
import type { ISelect } from "../../interfaces/select";
import Select from "./Select";

interface IGroupSelectProps {
  label: string;
  values: ISelect[];
  setFormValues: (values: IFormValues) => void;
  formValues: IFormValues;
  name: string;
}
export default function GroupSelect({
  label,
  values,
  setFormValues,
  formValues,
  name,
}: IGroupSelectProps): React.ReactNode {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-gray-500 font-medium">
        {label}
      </label>
      <Select
        values={values}
        setFormValues={setFormValues}
        formValues={formValues}
        name={name}
      />
    </div>
  );
}
