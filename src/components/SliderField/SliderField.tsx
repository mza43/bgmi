import "./SliderField.css";
import FieldLabel from "../FieldLabel/FieldLabel";

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
    <div className="sf">
      <div className="sf-top">
        <FieldLabel
          label={label}
          required={required}
          className="sf-label"
          reqClass="sf-req"
        />
        <div className="sf-value">{value}</div>
      </div>

      <input
        className="sf-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(
      to right,
      var(--mint) 0%,
      var(--mint) ${((value - min) / (max - min)) * 100}%,
      #2e2e2e ${((value - min) / (max - min)) * 100}%,
      #2e2e2e 100%
    )`,
        }}
      />

      {hint ? <div className="sf-hint">{hint}</div> : null}
    </div>
  );
}
