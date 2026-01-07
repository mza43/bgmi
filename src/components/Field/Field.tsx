import React from "react";

type Props = {
  label: string;
  required?: boolean;
  labelClass?: string;
  reqClass?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  hint?: string;
};

export default function Field({
  label,
  required,
  labelClass,
  reqClass,
  right,
  children,
  className,
  hint,
}: Props) {
  return (
    <div className={className ?? "field"}>
      <div
        className="field-top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className={labelClass ?? "field-label"}>
          {label}{" "}
          {required ? <span className={reqClass ?? "field-req"}>*</span> : null}
        </div>
        {right ? <div className="field-right">{right}</div> : null}
      </div>

      {children}

      {hint ? <div className="field-hint">{hint}</div> : null}
    </div>
  );
}
