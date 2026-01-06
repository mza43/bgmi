import "./FormField.css";

type Props = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function FormField({ label, required, children }: Props) {
  return (
    <div className="ff">
      <div className="ff-label">
        {label} {required ? <span className="ff-req">*</span> : null}
      </div>
      {children}
    </div>
  );
}
