import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./BrandHeader.css";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export default function BrandHeader({ isDark, onToggleTheme }: Props) {
  return (
    <header className="bh">
      <div className="bh-row">
        <div /> {/* left spacer */}

        <div className="bh-brand">
          <span className="bh-keto">KETO</span>
          <span className="bh-slim">SLIM</span>
        </div>

        <div className="bh-right">
          <DarkModeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>

      <h1 className="bh-title">
        Enter Your <span>Details</span>
      </h1>
    </header>
  );
}
