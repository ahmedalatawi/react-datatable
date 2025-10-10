interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  useTailwind?: boolean;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  useTailwind = false,
}: ToggleSwitchProps) {
  return (
    <label
      className={`toggle-switch ${useTailwind ? "use-tailwind" : "use-css"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-input"
      />
      <span className="toggle-slider"></span>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  );
}
