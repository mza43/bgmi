import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";
import "./SalesPage.css";

// images
import nowImg from "./images/now.webp";
import afterImg from "./images/after.webp";
import phoneImg from "./images/phone.webp";
import pubmedImg from "./images/pubmed.svg";
import mayoImg from "./images/mayo.webp";
// import arrowUrl from "./images/arrowback.svg";

// optional (if you have it, used in screenshots)
// import guaranteeBadge from "./images/guarantee.webp";

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

function PrimaryCTA({ onClick, text = "Claim My Plan" }: { onClick: () => void; text?: string }) {
  return (
    <button className="sp-claimBtn" type="button" onClick={onClick}>
      <span>{text}</span>
      <span className="sp-claimArrow">→</span>
    </button>
  );
}

export default function SalesPage() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  const [selectedPlan, setSelectedPlan] = useState<"installments" | "full">("full");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      { icon: "🥣", text: "Overwhelm-Free Delicious Recipes" },
      { icon: "🎓", text: "Weekly Tips & Guidance" },
    ],
    []
  );

  const onClaim = () => {
    // navigate("/checkout");
    const el = document.getElementById("pricing");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sp-page">
      {/* top bar */}
      <header className="sp-topbar">
        <div className="sp-topbarSpacer" />
        <div className="sp-brandTop">
          <span className="sp-keto">KETO</span>
          <span className="sp-slim">SLIM</span>
        </div>
        <div className="sp-topbarRight">
          <DarkModeToggle
            isDark={theme === "dark"}
            onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          />
        </div>
      </header>

      <main className="sp-container">
        <section className="sp-card">
          {/* HERO */}
          <div className="sp-hero">
            <div className="sp-heroBadge">
              <span className="sp-badgeIcon">🎯</span>
              <span>Plan Ready</span>
            </div>

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

                {/* SVG mask arrows (Vite-safe) */}
                <div className="sp-beforeGrid">
  <div className="sp-person">
    <img src={nowImg} alt="Now" />
    <div className="sp-cap">Now</div>
  </div>

  <div className="sp-arrows" aria-hidden="true" />

  <div className="sp-person">
    <img src={afterImg} alt="6 Months" />
    <div className="sp-cap">6 Months</div>
  </div>
</div>


                <div className="sp-person">
                  <img src={afterImg} alt="6 Months" />
                  <div className="sp-cap">6 Months</div>
                </div>
              </div>
            </div>

            <div className="sp-heroCtaWrap">
              <PrimaryCTA onClick={onClaim} />
            </div>
          </div>

          {/* BARS */}
          <div className="sp-section sp-barsSection">
            <div className="sp-barsBox">
              <BarsPair label="Body Fat" leftText="20–25%" rightText="10–12%" leftPct={32} rightPct={75} />
              <BarsPair label="Energy Levels" leftText="Low" rightText="Higher" leftPct={20} rightPct={70} />
              <BarsPair label="Physical Health" leftText="Stuck" rightText="Improving" leftPct={25} rightPct={72} />
              <BarsPair label="Metabolism Speed" leftText="Slow" rightText="Faster" leftPct={18} rightPct={78} />
            </div>

            <div className="sp-subTitle">Your program will also work on:</div>

            <ul className="sp-checks">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="sp-check">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="sp-barsCtaWrap">
              <PrimaryCTA onClick={onClaim} />
            </div>
          </div>

          {/* TOOLS */}
          <div className="sp-section">
            <h3 className="sp-sectionH3">Get all the right tools &amp; knowledge.</h3>

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

            <div className="sp-toolsCtaWrap">
              <PrimaryCTA onClick={onClaim} />
            </div>
          </div>

          {/* TRUST */}
          <div className="sp-section">
            <h2 className="sp-h2">Trusted by health &amp; nutrition professionals</h2>

            <div className="sp-proof">
              <div className="sp-proofCard">
                <img className="sp-proofLogo" src={pubmedImg} alt="PubMed Central" />
                <p className="sp-proofText">
                  There is evidence to suggest that a Ketogenic Diet can help with weight loss, visceral adiposity, and
                  appetite control.
                </p>
                <button className="sp-source" type="button">
                  source
                </button>
              </div>

              <div className="sp-proofCard">
                <img className="sp-proofLogo" src={mayoImg} alt="Mayo Clinic" />
                <p className="sp-proofText">
                  Research shows that a keto diet can result in weight loss and improvements in cardiovascular risk
                  factors.
                </p>
                <button className="sp-source" type="button">
                  source
                </button>
              </div>
            </div>
          </div>

          {/* PRICING */}
          <div className="sp-section" id="pricing">
            <h3 className="sp-h3">3 Month Custom Keto Plan</h3>

            <div className="sp-offer">
              <div className="sp-countdown">
                <span>Discount expires in:</span>
                <span className="sp-timer">
                  9:37 <span className="sp-clock">⏱</span>
                </span>
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

                  <div className="sp-radio">
                    <span className="sp-radioRing" />
                  </div>
                </div>

                {/* Option 2 (selected like screenshot) */}
                <div
                  className={`sp-planOption sp-planOptionPopular ${selectedPlan === "full" ? "isSelected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlan("full")}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPlan("full")}
                >
                  <div className="sp-popRow">
                    <span className="sp-popDiscount">DISCOUNT</span>
                    <span className="sp-popOff">23% OFF</span>
                  </div>

                  <div className="sp-planLeft">
                    <div className="sp-planSubStrong">
                      1 Payment of $67. Pay in full today
                      <br />
                      and save $20 instantly.
                    </div>
                  </div>

                  <div className="sp-checkCircle" aria-hidden="true">
                    ✓
                  </div>

                  <div className="sp-mostPopularBar">MOST POPULAR</div>
                </div>
              </div>

              <div className="sp-guaranteeRow">
                <span className="sp-gCheck">✅</span>
                <span>Risk-Free: Backed by 60-Day Money-Back Guarantee</span>
              </div>

              <div className="sp-priceCtaWrap">
                <button className="sp-continueBtn" type="button" onClick={onClaim}>
                  <span>Continue</span>
                  <span className="sp-claimArrow">→</span>
                </button>

                <button className="sp-declineLink" type="button" onClick={() => navigate("/")}>
                  No Thanks, I don’t want my plan.
                </button>
              </div>
            </div>
          </div>

          {/* MONEY BACK */}
          <div className="sp-section sp-mbg">
            <div className="sp-mbgHead">
              <h2 className="sp-mbgTitle">Money Back Guarantee</h2>
              {/* optional badge image like screenshot */}
              {/* {guaranteeBadge ? (
                <img className="sp-mbgBadge" src={guaranteeBadge} alt="60 Day Money Back Guarantee" />
              ) : null} */}
            </div>

            <p className="sp-mbgText">
              We are confident in our service quality and its results. So, if you are ready to reach your goals, it’s a
              risk-free offer.
            </p>

            <p className="sp-mbgText">
              We guarantee you’ll see visible results or you’ll receive a full refund within 60 days after your purchase.
            </p>

            <div className="sp-mbgDivider" />

            <p className="sp-fine">
              By continuing, you represent that you are over 18 years of age and agree that whatever reason you’re unhappy
              with your plan to contact customer support for a refund.
            </p>

            <p className="sp-fine">
              You will only be charged $67 today for your first quarter (details above). Your introductory period will
              last until Aug 27, 2025. You may cancel at any time before Aug 27, 2025, and you will not be charged.
            </p>

            <p className="sp-fine">
              If you don’t cancel, KetoSlim will automatically continue your membership at the end of your introductory
              period and charge the membership fee of <b>$67 quarterly</b> until you cancel.
            </p>

            <p className="sp-fine">
              Your subscription will be bound by our <span className="sp-link">Terms</span> and{" "}
              <span className="sp-link">Privacy Policy</span>.
            </p>

            <p className="sp-fine">
              If you would like a refund for any reason call <span className="sp-link">1-800-965-5045</span> or email{" "}
              <span className="sp-link">support@myketoslim.com</span>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
