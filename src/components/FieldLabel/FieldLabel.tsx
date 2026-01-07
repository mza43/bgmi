import React from "react";

type Props = {
  label: string;
  required?: boolean;
  className?: string;
  reqClass?: string;
  children?: React.ReactNode;
};

export default function FieldLabel({
  label,
  required,
  className,
  reqClass,
  children,
}: Props) {
  return (
    <div className={className}>
      {label} {required ? <span className={reqClass}>*</span> : null}
      {children ? <>{children}</> : null}
    </div>
  );
}
