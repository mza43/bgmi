import "./FormField.css";
import FieldLabel from "../FieldLabel/FieldLabel";

type Props = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function FormField({ label, required, children }: Props) {
  return (
    <div className="ff">
      <FieldLabel
        label={label}
        required={required}
        className="ff-label"
        reqClass="ff-req"
      />
      {children}
    </div>
  );
}
