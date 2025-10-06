interface IGRoupInputProps {
  label: string;
}
export default function GroupInput({
  label,
}: IGRoupInputProps): React.ReactNode {
  return (
    <div>
      <label htmlFor="">{label}</label>
    </div>
  );
}
