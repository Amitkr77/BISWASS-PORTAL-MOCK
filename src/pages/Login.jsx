import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormErrorSummary } from "../components/common/FormStatus";
import FormField from "../components/common/FormField";
import { LoginIcon, InfoIcon, ShieldIcon, UserIcon } from "../components/common/icons";
import { useAuth } from "../hooks/useAuth";
import { DEMO_CREDENTIALS } from "../services/rbac/seedData";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [error, setError] = useState("");

  function fillDemo(cred) {
    const form = formRef.current;
    if (!form) return;
    form.elements["login-id"].value = cred.email;
    form.elements["login-password"].value = cred.password;
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const email = form.elements["login-id"].value;
    const password = form.elements["login-password"].value;
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
    navigate("/portal", { replace: true });
  }

  return (
    <>
      {/* <PageBanner title="Login" description="Sign in to access your Ayushman Bharat &ndash; PM-JAY Bihar account." /> */}

      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-govt-gray-200 bg-white p-6 shadow-gov sm:p-8">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-govt-blue-light text-govt-blue">
                <LoginIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-heading text-xl font-bold text-govt-blue-dark">
                Login
              </h2>
              <p className="mt-1 text-sm text-govt-gray-600">
                Role-based access for administrators and users.
              </p>
            </div>

            <form
              ref={formRef}
              className="mt-6 space-y-5"
              noValidate
              onSubmit={handleSubmit}
            >
              <FormErrorSummary show={!!error}>{error}</FormErrorSummary>

              <FormField
                id="login-id"
                label="Email Address"
                type="email"
                required
                autoComplete="username"
              />
              <FormField
                id="login-password"
                label="Password"
                type="password"
                required
                autoComplete="current-password"
              />

              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>

            <div className="mt-6 rounded-sm bg-govt-blue-light px-3 py-3">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-govt-gray-700 mb-2.5">
                <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-govt-blue" />
                <span>
                  Demo RBAC portal &ndash; no real backend. Tap an account
                  below to autofill the form, then press Login.
                </span>
              </p>
              <ul className="space-y-1.5">
                {DEMO_CREDENTIALS.map((cred) => (
                  <li key={cred.email}>
                    <button
                      type="button"
                      onClick={() => fillDemo(cred)}
                      className="w-full flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-white border border-govt-blue/15 rounded-sm px-3 py-2 text-left hover:border-govt-blue transition-colors"
                    >
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-govt-blue-dark">
                        {cred.label === "Administrator" ? (
                          <ShieldIcon className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <UserIcon className="w-3.5 h-3.5 shrink-0" />
                        )}
                        {cred.label}
                      </span>
                      <span className="text-[11px] text-govt-gray-600 tabular-nums">
                        {cred.email} / {cred.password}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* <p className="mt-6 text-center text-sm">
            <Link
              to="/"
              className="font-semibold text-govt-blue hover:underline"
            >
              &larr; Back to Home
            </Link>
          </p> */}
        </div>
      </section>
    </>
  );
}
