import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";
import "./SalesPage.css";
import BrandHeader from "../../components/BrandHeader/BrandHeader";

// images
import nowImg from "./images/now.webp";
import afterImg from "./images/after.webp";
import phoneImg from "./images/phone.webp";
import pubmedImg from "./images/pubmed.svg";
import mayoImg from "./images/mayo.webp";

type Theme = "light" | "dark";

function BarsPair({
  label,
  leftText,
  rightText,
  leftPct,
  rightPct,
}: {
  label: string;
  leftText: string;
  rightText: string;
  leftPct: number;
  rightPct: number;
}) {
  return (
    <div className="sp-barsRow">
      <div className="sp-barsCol">
        <div className="sp-barsTop">
          <span className="sp-barsLabel">{label}</span>
          <span className="sp-barsVal sp-red">{leftText}</span>
        </div>
        <div className="sp-track">
          <div className="sp-fill sp-fillRed" style={{ width: `${leftPct}%` }} />
        </div>
      </div>

      <div className="sp-barsCol">
        <div className="sp-barsTop">
          <span className="sp-barsLabel">{label}</span>
          <span className="sp-barsVal sp-mint">{rightText}</span>
        </div>
        <div className="sp-track">
          <div className="sp-fill sp-fillMint" style={{ width: `${rightPct}%` }} />
        </div>
      </div>
    </div>
  );
}

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
}

export default function SalesPage() {
  const navigate = useNavigate();

  // pricing ref (used for scroll + IntersectionObserver)
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const [selectedPlan, setSelectedPlan] = useState<"installments" | "full">("full");

  // Sticky button visibility (hide when pricing in view)
  const [hideSticky, setHideSticky] = useState(false);

  // Countdown (10:00 -> 0:00)
  const [remaining, setRemaining] = useState<number>(600);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Timer: persist end time in sessionStorage so it doesn’t reset on re-render
  useEffect(() => {
    const KEY = "ketoslim_timer_end_v1";
    const now = Date.now();
    const savedEnd = sessionStorage.getItem(KEY);

    let endTime: number;
    if (savedEnd) {
      const parsed = Number(savedEnd);
      endTime = Number.isFinite(parsed) ? parsed : now + 10 * 60 * 1000;
    } else {
      endTime = now + 10 * 60 * 1000; // 10 minutes
      sessionStorage.setItem(KEY, String(endTime));
    }

    const tick = () => {
      const diffMs = endTime - Date.now();
      const diffSec = Math.ceil(diffMs / 1000);
      setRemaining(Math.max(0, diffSec));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Hide sticky when pricing is visible
  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setHideSticky(entry.isIntersecting),
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bullets = useMemo(
    () => [
      "Improving Digestion",
      "Toning Muscles",
      "Mental Wellness Reset",
      "Physical Endurance Boost",
    ],
    []
  );

  const tools = useMemo(
    () => [
      { icon: "🍽️", text: "Daily Custom Meal Plan" },
      { icon: "🛒", text: "Done-For-You Grocery Lists" },
      { icon: "🥗", text: "Overwhelm-Free Delicious Recipes" },
      { icon: "🎓", text: "Weekly Tips & Guidance" },
    ],
    []
  );

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onContinue = () => {
    // connect your checkout route if you want:
    // navigate("/checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sp-page">
      {/* top bar */}
     <BrandHeader
  isDark={theme === "dark"}
  onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
/>


      <main className="sp-container">
        <section className="sp-card">
          {/* HERO */}
          <div className="sp-hero">
            <div className="sp-heroBadge">🎯 Plan Ready</div>

            <h1 className="sp-title">
              Your Personalized <br />
              KetoSlim Plan Is Ready
            </h1>

            <div className="sp-beforeCard">
              <div className="sp-beforeGrid">
                <div className="sp-person">
                  <img src={nowImg} alt="Now" />
                  <div className="sp-cap">Now</div>
                </div>

                {/* BIG BLUR RED ARROWS (NO SVG IMPORT) */}
                <div className="sp-arrows" aria-hidden="true">
                  <span className="sp-chevron sp-chevron1" />
                  <span className="sp-chevron sp-chevron2" />
                </div>

                <div className="sp-person">
                  <img src={afterImg} alt="6 Months" />
                  <div className="sp-cap">6 Months</div>
                </div>
              </div>
            </div>

            <div className="sp-barsBox">
              <BarsPair label="Body Fat" leftText="20–25%" rightText="10–12%" leftPct={32} rightPct={75} />
              <BarsPair label="Energy Levels" leftText="Low" rightText="Higher" leftPct={20} rightPct={70} />
              <BarsPair label="Physical Health" leftText="Stuck" rightText="Improving" leftPct={25} rightPct={72} />
              <BarsPair label="Metabolism Speed" leftText="Slow" rightText="Faster" leftPct={18} rightPct={78} />
            </div>
          </div>

          {/* WHAT YOU’LL WORK ON */}
          <div className="sp-section">
            <div className="sp-sectionTitle">Your program will also work on:</div>

            <ul className="sp-checks">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="sp-check">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="sp-centerLine">Get all the right tools &amp; knowledge.</div>

            <div className="sp-toolsRow">
              <ul className="sp-tools">
                {tools.map((t) => (
                  <li key={t.text}>
                    <span className="sp-toolIcon">{t.icon}</span>
                    <span className="sp-toolText">{t.text}</span>
                  </li>
                ))}
              </ul>

              <div className="sp-phone">
                <img src={phoneImg} alt="App preview" />
              </div>
            </div>
          </div>

          {/* TRUST */}
          <div className="sp-section">
            <h2 className="sp-h2">Trusted by health &amp; nutrition professionals</h2>

            <div className="sp-proof">
              <div className="sp-proofCard">
                <img className="sp-proofLogo" src={pubmedImg} alt="PubMed Central" />
                <p className="sp-proofText">
                  There is evidence to suggest that a Ketogenic Diet can help with weight loss, visceral adiposity, and appetite control.
                </p>
                <button className="sp-source" type="button">source</button>
              </div>

              <div className="sp-proofCard">
                <img className="sp-proofLogo" src={mayoImg} alt="Mayo Clinic" />
                <p className="sp-proofText">
                  Research shows that a keto diet can result in weight loss and improvements in cardiovascular risk factors.
                </p>
                <button className="sp-source" type="button">source</button>
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="sp-section" id="pricing" ref={pricingRef}>
            <h3 className="sp-h3">3 Month Custom Keto Plan</h3>

            <div className="sp-offer">
              <div className="sp-countdown">
                <span>Discount expires in:</span>
                <span className="sp-timer">{formatMMSS(remaining)} ⏱</span>
              </div>

              <div className="sp-planList">
                {/* Option 1 */}
                <div
                  className={`sp-planOption ${selectedPlan === "installments" ? "isSelected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlan("installments")}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPlan("installments")}
                >
                  <div className="sp-planLeft">
                    <div className="sp-planTitle">3 PAYMENTS OF $29</div>
                    <div className="sp-planSub">Just $29 today. Split the rest over 2 easy payments.</div>
                  </div>

                  <div className={`sp-choice ${selectedPlan === "installments" ? "isSelected" : ""}`}>
                    {selectedPlan === "installments" ? <div className="sp-choiceDot" /> : null}
                  </div>
                </div>

                {/* Option 2 */}
                <div
                  className={`sp-planOption ${selectedPlan === "full" ? "isSelected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlan("full")}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPlan("full")}
                >
                  <div className="sp-planLeft">
                    <div className="sp-pillRow">
                      <span className="sp-badge">DISCOUNT</span>
                      <span className="sp-offTag">23% OFF</span>
                    </div>
                    <div className="sp-planTitle" style={{ marginTop: 6 }}>
                      1 Payment of $67
                    </div>
                    <div className="sp-planSub">Pay in full today and save $20 instantly.</div>
                  </div>

                  <div className={`sp-choice ${selectedPlan === "full" ? "isSelected" : ""}`}>
                    {selectedPlan === "full" ? <div className="sp-choiceDot" /> : null}
                  </div>
                </div>

                <div className="sp-mostPopularLabel">MOST POPULAR</div>
              </div>

              <div className="sp-offerMid">
                <div className="sp-guarantee">✅ Risk-Free: Backed by 60-Day Money-Back Guarantee</div>

                {/* keep this button inside pricing */}
                <button className="sp-cta" type="button" onClick={onContinue}>
                  <span>Continue</span>
                  <span className="sp-ctaArrow">→</span>
                </button>

                <button className="sp-decline" type="button" onClick={() => navigate("/")}>
                  No Thanks, I don’t want my plan.
                </button>
              </div>
            </div>
          </div>

          {/* MONEY BACK */}
          <div className="sp-section sp-mbg">
            <h2 className="sp-h2">Money Back Guarantee</h2>

            <p className="sp-text">
              We are confident in our service quality and its results. So, if you are ready to reach your goals, it’s a risk-free offer.
            </p>

            <p className="sp-text">
              We guarantee you’ll see visible results or you’ll receive a full refund within 60 days after your purchase.
            </p>

            <div className="sp-divider" />

            <p className="sp-fine">
              By continuing, you represent that you are over 18 years of age and agree that whatever reason you’re unhappy with your plan
              to contact customer support for a refund.
            </p>

            <p className="sp-fine">
              You will only be charged $67 today for your first quarter (details above). Your introductory period will last until Aug 27,
              2025. You may cancel at any time before Aug 27, 2025, and you will not be charged.
            </p>

            <p className="sp-fine">
              If you don’t cancel, KetoSlim will automatically continue your membership at the end of your introductory period and charge
              the membership fee of $67 quarterly until you cancel.
            </p>

            <p className="sp-fine">
              Your subscription will be bound by our <span className="sp-link">Terms</span> and <span className="sp-link">Privacy Policy</span>.
            </p>

            <p className="sp-fine">
              If you would like a refund for any reason call <span className="sp-link">1-800-965-5045</span> or email{" "}
              <span className="sp-link">support@myketoslim.com</span>.
            </p>
          </div>
        </section>
      </main>

      {/* Sticky Claim My Plan (shows only when NOT at pricing) */}
      {!hideSticky && (
        <div className="sp-sticky">
          <button className="sp-stickyBtn" type="button" onClick={scrollToPricing}>
            <span>Claim My Plan</span>
            <span className="sp-ctaArrow">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
