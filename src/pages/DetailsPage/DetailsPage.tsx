import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "../../components/BrandHeader/BrandHeader";
import FormField from "../../components/FormField/FormField";
import SliderField from "../../components/SliderField/SliderField";
import { saveForm } from "../../utils/storage";
import "./DetailsPage.css";

type Theme = "light" | "dark";
type Gender = "male" | "female" | "";

type LocalForm = {
  gender: Gender;
  bodyFat: number;
  bmi: number;
  calories: string;
  waterCups: string;
  weeklyLoss: string;
  daysToResults: string;
};

const initial: LocalForm = {
  gender: "",
  bodyFat: 0,
  bmi: 0,
  calories: "",
  waterCups: "",
  weeklyLoss: "",
  daysToResults: "",
};

export default function DetailsPage() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [form, setForm] = useState<LocalForm>(initial);

  const isValid = useMemo(() => {
    return (
      (form.gender === "male" || form.gender === "female") &&
      form.calories.trim() !== "" &&
      form.waterCups.trim() !== "" &&
      form.weeklyLoss.trim() !== "" &&
      form.daysToResults.trim() !== ""
    );
  }, [form]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    saveForm({
      gender: form.gender as "male" | "female",
      bodyFat: Number(form.bodyFat),
      bmi: Number(form.bmi),
      calories: Number(form.calories),
      waterCups: Number(form.waterCups),
      weeklyLoss: Number(form.weeklyLoss),
      daysToResults: Number(form.daysToResults),
    });

    navigate("/results");
  }

  return (
    <div className="container">
      <BrandHeader
        isDark={theme === "dark"}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main className="center">
        <h1 className="bh-title">
          Enter Your <span>Details</span>
        </h1>
        <section className="card dp-card">
          <form className="dp-form" onSubmit={onSubmit}>
            <FormField label="Gender" required>
              <div className="gender-row" role="radiogroup" aria-label="Gender">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === "male"}
                    onChange={() => setForm((p) => ({ ...p, gender: "male" }))}
                  />
                  <span>Male</span>
                </label>

                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    checked={form.gender === "female"}
                    onChange={() =>
                      setForm((p) => ({ ...p, gender: "female" }))
                    }
                  />
                  <span>Female</span>
                </label>
              </div>
            </FormField>

            <SliderField
              label="Body Fat %"
              required
              value={form.bodyFat}
              min={0}
              max={100}
              hint="Enter your estimated body fat percentage (0-100)."
              onChange={(v) => setForm((p) => ({ ...p, bodyFat: v }))}
            />

            <SliderField
              label="BMI"
              required
              value={form.bmi}
              min={0}
              max={40}
              hint="Enter your Body Mass Index (0-40)."
              onChange={(v) => setForm((p) => ({ ...p, bmi: v }))}
            />

            <FormField label="Daily Calorie Target" required>
              <input
                placeholder="e.g. 2000"
                value={form.calories}
                onChange={(e) =>
                  setForm((p) => ({ ...p, calories: e.target.value }))
                }
              />
            </FormField>

            <FormField label="Cups of Water Per Day" required>
              <select
                value={form.waterCups}
                onChange={(e) =>
                  setForm((p) => ({ ...p, waterCups: e.target.value }))
                }
              >
                <option value="" disabled>
                  Select cups
                </option>
                {Array.from({ length: 21 }, (_, i) => i).map((n) => (
                  <option key={n} value={String(n)}>
                    {n}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Weekly Weight Loss Goal (lbs)" required>
              <input
                placeholder="e.g. 1.5"
                value={form.weeklyLoss}
                onChange={(e) =>
                  setForm((p) => ({ ...p, weeklyLoss: e.target.value }))
                }
              />
            </FormField>

            <FormField label="Days to See Results" required>
              <input
                placeholder="e.g. 30"
                value={form.daysToResults}
                onChange={(e) =>
                  setForm((p) => ({ ...p, daysToResults: e.target.value }))
                }
              />
            </FormField>

            <button className="dp-btn" type="submit" disabled={!isValid}>
              See My Results
            </button>

            {!isValid && (
              <div className="dp-helper">
                Please fill out all required fields to enable the button.
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
