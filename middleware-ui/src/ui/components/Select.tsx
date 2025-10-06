import { useState } from "react";
import type { ISelect } from "../../interfaces/select";
import { IconArrowDown } from "../../../public/icons/index";
import type { IFormValues } from "../../interfaces/formValues";

interface ISelectProps {
  values: ISelect[];
  setFormValues: (values: IFormValues) => void;
  formValues: IFormValues;
  name: string;
}
export default function Select({
  values,
  setFormValues,
  formValues,
  name,
}: ISelectProps): React.ReactNode {
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  // Get the current value from formValues
  const currentValue = formValues[name as keyof IFormValues];
  const selectedLabel =
    values.find((v) => v.value === currentValue)?.label || "Select";
  return (
    <div
      className={`border border-gray-200 rounded-md p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 relative`}
      onClick={() => {
        setOpenSelect(!openSelect);
      }}
    >
      <div className="flex items-center justify-between">
        <h6>{selectedLabel}</h6>
        <span>{<IconArrowDown />}</span>
      </div>
      {openSelect && (
        <div
          className="absolute top-11 left-0 border border-gray-200 w-full rounded-md z-[100] bg-white
        "
        >
          <ul className="flex flex-col gap-1">
            {values.map((value) => (
              <li
                key={value.value}
                className="hover:bg-gray-100 cursor-pointer rounded-md p-1 pl-2"
                onClick={() => {
                  setOpenSelect(false);
                  setFormValues({ ...formValues, [name]: value.value });
                }}
              >
                {value.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
