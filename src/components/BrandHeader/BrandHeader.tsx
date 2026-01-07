import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import "./BrandHeader.css";
import logo from "./logo/logo.png";

type Props = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function BrandLogo() {
  return (
    <div className="bh-brand">
      <img src={logo} alt="KetoSlim" className="bh-logo" />
    </div>
  );
}

export default function BrandHeader({ isDark, onToggleTheme }: Props) {
  return (
    <header className="bh">
      <div className="bh-row">
        <div /> {/* left spacer */}
        <div className="bh-brand">
          <img src={logo} alt="KetoSlim" className="bh-logo" />
        </div>
        <div className="bh-right">
          <DarkModeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
