import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";
import { loadForm } from "../../utils/storage";
import "./ResultsPage.css";

import result1Img from "./images/result1.png";
import result2Img from "./images/result2.png";
import result3Img from "./images/result3.png";
import result4Img from "./images/result4.png";
import result5Img from "./images/result5.png";
import result6Img from "./images/result6.png";

type Theme = "light" | "dark";
type StoredForm = NonNullable<ReturnType<typeof loadForm>>;

type StepKey =
  | "bodyFat"
  | "bmi"
  | "calories"
  | "hydration"
  | "weightRate"
  | "time";

type Step = {
  key: StepKey;
  backLabel?: string;
  icon: React.ReactNode;
  title: (d: StoredForm) => React.ReactNode;
  subtitle?: (d: StoredForm) => React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  paragraphs: (d: StoredForm) => React.ReactNode;
};

function ProgressDots({
  total,
  activeIndex,
}: {
  total: number;
  activeIndex: number;
}) {
  return (
    <div className="rp-dots" aria-label="progress">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`rp-dot ${i === activeIndex ? "is-on" : ""}`}
        />
      ))}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

export default function ResultsPage() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const data = useMemo(() => loadForm(), []);

  useEffect(() => {
    if (!data) navigate("/", { replace: true });
  }, [data, navigate]);

  const steps: Step[] = useMemo(() => {
    if (!data) return [];

    const bodyFat = clamp(data.bodyFat, 0, 100);
    const bmi = clamp(data.bmi, 0, 80);
    const calories = clamp(data.calories, 0, 9999);
    const water = clamp(data.waterCups, 0, 30);
    const weeklyLoss = clamp(data.weeklyLoss, 0, 10);
    const days = clamp(data.daysToResults, 1, 365);

    return [
      
      {
        key: "bodyFat",
        icon: <div className="rp-icon">⚖️</div>,
        title: () => (
          <>
            Your Body Fat <br />
            Percentage Is <span className="rp-red">{bodyFat}%</span>
          </>
        ),
        subtitle: () => <>Here’s Why That Matters</>,
        imageSrc: result1Img,
        imageAlt: "Body Fat Result",
        paragraphs: () => (
          <>
            <p>
              Your body fat percentage gives a clearer picture than BMI alone.
              It tells us how much of your body is lean mass (muscle, organs,
              bone) vs stored fat.
            </p>

            <p>
              Too much stored fat doesn’t just affect how you look — it impacts
              your energy, hormone balance, and ability to burn fat efficiently.
            </p>

            <p className="rp-redText">
              Your current level may be slowing metabolism, increasing
              inflammation, or making it harder to stay consistent with
              workouts.
            </p>
          </>
        ),
      },

      //  BMI
      {
        key: "bmi",
        backLabel: "Body Fat %",
        icon: <div className="rp-icon">📊</div>,
        title: () => (
          <>
            Your BMI Is <span className="rp-red">{bmi}</span>
            <br />
            <span className="rp-subTitle">— What That Means</span>
          </>
        ),
        imageSrc: result2Img,
        imageAlt: "BMI Result",
        paragraphs: () => (
          <>
            <p>
              BMI (Body Mass Index) is a quick way to estimate how your weight
              might affect your health based on your height and weight.
            </p>

            <p>
              When your BMI is too high, your body may store more fat than it
              uses. That can slow your metabolism, drain your energy, and make
              fat loss harder — even if you’re putting in effort.
            </p>

            <p className="rp-redText">
              You’re right on the edge — just a few small shifts could unlock
              better energy and faster fat-burning.
            </p>
          </>
        ),
      },

      // Calories
      {
        key: "calories",
        backLabel: "BMI",
        icon: <div className="rp-icon">🔥</div>,
        title: () => (
          <>
            You Should Be Eating Around <br />
            <span className="rp-red">{calories} Calories</span>
          </>
        ),
        subtitle: () => <>But Not All Calories Are Equal</>,
        imageSrc: result3Img,
        imageAlt: "Calorie Result",
        paragraphs: () => (
          <>
            <p>
              Your body burns calories just to stay alive — that’s your BMR. Add
              in movement, and you burn even more. Eat less than you burn? You
              lose weight. Eat more? You store it. Simple math, but the{" "}
              <i>type</i> of calories still makes or breaks your results.
            </p>

            <p>
              Most people eat low-quality calories that spike cravings, crash
              energy, and cause fat to stick — even if they’re technically under
              their daily limit.
            </p>

            <p className="rp-redText">
              Extreme restriction can backfire — slowing your metabolism,
              increasing stress, and making results harder to sustain. Keto
              helps you eat smarter, not just less.
            </p>
          </>
        ),
      },

      // Hydration
      {
        key: "hydration",
        backLabel: "Caloric Intake",
        icon: <div className="rp-icon">💧</div>,
        title: () => (
          <>
            Your Body Needs <span className="rp-red">{water}</span> of Water{" "}
            <br />
            Daily
          </>
        ),
        subtitle: () => <>Here’s Why That Matters</>,
        imageSrc: result4Img,
        imageAlt: "Hydration Result",
        paragraphs: () => (
          <>
            <p>
              Hydration is a fat-burning multiplier. Without enough water, your
              body holds onto toxins, slows digestion, and burns fat less
              efficiently.
            </p>

            <p>
              Even mild dehydration can feel like fatigue, hunger, or sugar
              cravings. You’re not lazy — you’re likely under-hydrated.
            </p>
          </>
        ),
      },

      //Weight Rate
      {
        key: "weightRate",
        backLabel: "Hydration",
        icon: <div className="rp-icon">📉</div>,
        title: () => (
          <>
            You Could Be Losing <br />
            <span className="rp-red">{weeklyLoss} lbs / Week</span>
          </>
        ),
        subtitle: () => <>With the Right Fuel Source</>,
        imageSrc: result5Img,
        imageAlt: "Weight Rate Result",
        paragraphs: () => (
          <>
            <p>
              This is your potential, what your body could lose if it’s in
              fat-burning mode. But that depends on getting your metabolism
              working with you, not against you.
            </p>

            <p>
              Low energy, stubborn cravings, and slow progress usually mean your
              body is still burning sugar instead of fat — and that keeps weight
              loss stuck.
            </p>

            <p className="rp-redText">
              With your numbers, results could show up even faster than
              expected, but only if your metabolism is dialed in and you’re
              burning fat, not sugar.
            </p>
          </>
        ),
      },

      // Time to Results
      {
        key: "time",
        backLabel: "Weight Rate",
        icon: <div className="rp-icon">⏳</div>,
        title: () => (
          <>
            You Could See Results <br />
            in as Little as <span className="rp-red">{days} Days</span>
          </>
        ),
        imageSrc: result6Img,
        imageAlt: "Time to Results",
        paragraphs: () => (
          <>
            <p>
              Visible change doesn’t take forever — when your metabolism shifts,
              you can start dropping bloat, water weight, and fat surprisingly
              fast.
            </p>

            <p>
              It’s not about how long you try — it’s about whether your body’s
              actually set up to change. The wrong plan wastes months.
            </p>

            <p className="rp-redText">
              You’re already aware — and that’s step one. Now imagine pairing
              that awareness with a plan that shows results in the mirror by day
              10.
            </p>
          </>
        ),
      },
    ];
  }, [data]);

  const [stepIndex, setStepIndex] = useState(0);

  if (!data) return null;
  if (!steps.length) return null;

  const step = steps[stepIndex];
  const total = steps.length;


  const showBack = stepIndex !== 0;

  const handleNext = () => {
    if (stepIndex < total - 1) setStepIndex((i) => i + 1);
    else navigate("/sales", { replace: true });
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  return (
    <div className="container">
      <header className="rp-head center">
        <div className="rp-top">
          <div />
          <div className="rp-brand">
            <span className="rp-keto">KETO</span>
            <span className="rp-slim">SLIM</span>
          </div>
          <div className="rp-right">
            <DarkModeToggle
              isDark={theme === "dark"}
              onToggle={() =>
                setTheme((t) => (t === "dark" ? "light" : "dark"))
              }
            />
          </div>
        </div>

        <div className="rp-subrow">
          <div className="rp-subtitle">Your Results</div>
          <ProgressDots total={6} activeIndex={stepIndex} />
        </div>
      </header>

      <main className="center">
        <section className="card rp-card">
          <div className="rp-cardInner">
            {step.icon}

            <h1 className="rp-title">{step.title(data)}</h1>

            {step.subtitle ? (
              <div className="rp-subhead">{step.subtitle(data)}</div>
            ) : null}

            <div className="rp-illustration">
              <img className="rp-img" src={step.imageSrc} alt={step.imageAlt} />
            </div>

            <div className="rp-body">{step.paragraphs(data)}</div>
          </div>
        </section>

        <div className={`rp-actions ${showBack ? "" : "only-next"}`}>
          {showBack ? (
            <button
              type="button"
              className="rp-btn rp-btn-back"
              onClick={handleBack}
            >
              <span className="rp-arrowLeft">←</span>
              <span>{step.backLabel ?? "Back"}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            className="rp-btn rp-btn-next"
            onClick={handleNext}
          >
            <span>Next</span>
            <span className="rp-arrowRight">→</span>
          </button>
        </div>
      </main>
    </div>
  );
}
