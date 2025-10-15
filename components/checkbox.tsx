import { useId } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export function Checkbox({ label, checked, onChange, id }: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  return (
    <label
      htmlFor={checkboxId}
      className="flex items-center gap-4 md:gap-2 cursor-pointer text-xs text-white/80"
    >
      {/* Hidden native checkbox */}
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Custom box */}
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border transition
          ${
            checked
              ? "bg-[#ffffff] border-[#000000]"
              : "border-[#333dff] backdrop-blur-lg bg-white/70"
          }`}
      >
        {checked && (
          <svg
            className="h-3.5 w-3.5 text-black"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path d="M5 10l3 3 7-7" />
          </svg>
        )}
      </span>

      <span className="w-[65vw] md:w-full text-[#333dff]">{label}</span>
    </label>
  );
}
