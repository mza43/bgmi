export type Gender = "male" | "female";

export type FormState = {
  gender: Gender;
  bodyFat: number;
  bmi: number;
  calories: number;
  waterCups: number;
  weeklyLoss: number; // lbs
  daysToResults: number;
};

const KEY = "ketoSlimForm";

export function saveForm(data: FormState) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function loadForm(): FormState | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FormState;
  } catch {
    return null;
  }
}
