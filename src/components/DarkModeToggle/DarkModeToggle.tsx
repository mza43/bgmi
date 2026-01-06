import "./DarkModeToggle.css";

type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export default function DarkModeToggle({ isDark, onToggle }: Props) {
  return (
    <button type="button" className="dm" onClick={onToggle}>
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
