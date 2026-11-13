export const PLAN_INTENT_COPY = {
  title: 'Planning read',
  change: 'Change',
  question: 'What is this portion meant to support?',
  answers: {
    regular: 'A regular cost',
    dated: 'A payment on a date',
    reserve: 'A reserve for the unexpected',
    skip: 'Skip for now',
  },
  labels: {
    regular: 'Regular costs',
    reserve: 'Reserve',
    goals: 'Goals',
  },
  sentences: {
    regular: 'For costs that come round often, like rent or bills.',
    reserve: 'For something unexpected.',
    goals: "For something you're planning, like a payment on a date.",
  },
  why: {
    regular: "Regular costs: you'd use this for costs that come round often.",
    reserve: "Reserve: you'd want this to cover a surprise.",
    goals: "Goals: you'd keep this in view for something you're planning.",
  },
  dated: 'A payment on a date: see the Planning read.',
  limits: 'A planning view, not money set aside.',
  skipped: 'This portion could go towards regular costs, a reserve, or something ahead. A planning view, not money set aside.',
  confirmation: (choice: string) => `You said this portion is meant to support ${choice}. A planning view, not money set aside.`,
} as const;
