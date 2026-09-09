'use client';

import React, { useRef } from 'react';
import { SIMULATION_DISPLAY_CURRENCY_COPY as copy } from '../lib/narrative/orientation-surface';
import {
  SIMULATION_DISPLAY_CURRENCIES,
  setSimulationDisplayCurrency,
  useSimulationDisplayCurrency,
} from '../lib/state/simulation-display-currency';

const focusStyle = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hedgr-500 focus-visible:ring-offset-2';

export function SimulationDisplayCurrencySelector({ placement }: { placement: 'entry' | 'settings' }) {
  const currency = useSimulationDisplayCurrency();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (placement === 'entry') {
    return (
      <section data-testid="simulation-display-currency-entry" className="min-w-0 space-y-3">
        <label htmlFor="simulation-display-currency" className="block font-medium text-hedgr-800">
          {copy.label}
        </label>
        <select
          id="simulation-display-currency"
          value={currency}
          onChange={(event) => setSimulationDisplayCurrency(event.target.value)}
          aria-describedby="simulation-display-currency-helper"
          className={`min-h-11 w-full min-w-0 rounded-xl border border-hedgr-300 bg-white px-3 py-3 text-sm text-hedgr-800 ${focusStyle}`}
        >
          {SIMULATION_DISPLAY_CURRENCIES.map(({ code, name }) => (
            <option key={code} value={code}>{code} — {name}</option>
          ))}
        </select>
        <p id="simulation-display-currency-helper" className="text-sm leading-relaxed text-hedgr-600">
          {copy.helper}
        </p>
      </section>
    );
  }

  return (
    <div data-testid="simulation-display-currency-settings" className="border-y border-hedgr-100">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal();
          dialogRef.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
        }}
        className={`flex min-h-16 w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 text-left ${focusStyle}`}
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-hedgr-800">{copy.settingsLabel}</span>
          <span className="mt-1 block text-sm leading-relaxed text-hedgr-500">{copy.settingsHelper}</span>
        </span>
        <span className="text-sm font-semibold text-hedgr-800">{currency} <span aria-hidden="true">›</span></span>
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="display-currency-dialog-title"
        aria-describedby="display-currency-dialog-helper"
        onClose={() => triggerRef.current?.focus()}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-hedgr-200 bg-white p-4 text-hedgr-800 shadow-xl backdrop:bg-hedgr-800/40 sm:p-6"
      >
        <h2 id="display-currency-dialog-title" className="text-xl font-semibold">{copy.settingsLabel}</h2>
        <p id="display-currency-dialog-helper" className="mt-3 text-sm leading-relaxed text-hedgr-600">{copy.helper}</p>
        <fieldset className="my-5 min-w-0 space-y-1">
          <legend className="sr-only">{copy.label}</legend>
          {SIMULATION_DISPLAY_CURRENCIES.map(({ code, name }) => (
            <label key={code} className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl px-0 py-3 text-sm sm:px-3 has-[:checked]:bg-hedgr-100/40">
              <input
                type="radio"
                name="simulation-display-currency"
                value={code}
                checked={currency === code}
                onChange={() => setSimulationDisplayCurrency(code)}
                className={`h-4 w-4 shrink-0 accent-hedgr-primary ${focusStyle}`}
              />
              <span className="min-w-0 break-words">{code} — {name}</span>
            </label>
          ))}
        </fieldset>
        <form method="dialog">
          <button className={`min-h-11 w-full rounded-xl bg-hedgr-primary px-5 py-3 font-medium text-white hover:bg-hedgr-600 ${focusStyle}`}>Done</button>
        </form>
      </dialog>
    </div>
  );
}
