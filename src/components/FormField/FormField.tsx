import "./FormField.css";
import Field from "../Field/Field";

type Props = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function FormField({ label, required, children }: Props) {
  return (
    <Field
      label={label}
      required={required}
      className="ff"
      labelClass="ff-label"
      reqClass="ff-req"
    >
      {children}
    </Field>
  );
}
