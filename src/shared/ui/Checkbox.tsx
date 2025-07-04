import { InputHTMLAttributes, FC } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox: FC<CheckboxProps> = ({
  label,
  className = '',
  ...props
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className={`w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};