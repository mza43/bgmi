import "./SliderField.css";
import Field from "../Field/Field";
import { rangeBackground } from "../../utils/range";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  required?: boolean;
  hint?: string;
};

export default function SliderField({
  value,
  onChange,
  min,
  max,
  step = 1,
  label,
  required,
  hint,
}: Props) {
  return (
    <Field
      label={label}
      required={required}
      className="sf"
      labelClass="sf-label"
      reqClass="sf-req"
      right={<div className="sf-value">{value}</div>}
      hint={hint}
    >
      <input
        className="sf-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={rangeBackground(value, min, max)}
      />
    </Field>
  );
}
