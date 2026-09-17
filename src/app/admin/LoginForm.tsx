"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-[1.5rem] border border-line bg-white/80 p-7"
    >
      <h1 className="h3 text-charcoal">Admin</h1>
      <label className="flex flex-col gap-2 text-[0.875rem] font-medium text-charcoal">
        Access code
        <input
          name="code"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          required
          autoFocus
          className="h-12 rounded-xl border border-line-strong bg-white px-4 text-[1rem] tracking-[0.3em] text-charcoal outline-none focus:border-gold"
        />
      </label>
      {state.error ? (
        <p role="alert" className="text-[0.875rem] text-brown">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-xl bg-brown text-[0.9375rem] font-semibold text-warm transition-opacity disabled:opacity-60"
      >
        {pending ? "Checking…" : "Open"}
      </button>
    </form>
  );
}
