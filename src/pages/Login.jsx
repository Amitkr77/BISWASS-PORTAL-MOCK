import { Link } from "react-router-dom";
import PageBanner from "../components/common/PageBanner";
import { useValidatedForm } from "../hooks/useValidatedForm";
import {
  FormErrorSummary,
  FormSuccessBox,
} from "../components/common/FormStatus";
import FormField from "../components/common/FormField";
import { LoginIcon, InfoIcon } from "../components/common/icons";

export default function Login() {
  const {
    formRef,
    errors,
    submitted,
    showErrorSummary,
    handleBlur,
    handleInput,
    handleSubmit,
  } = useValidatedForm();

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
                For beneficiaries, hospitals and programme staff.
              </p>
            </div>

            <form
              ref={formRef}
              className="mt-6 space-y-5"
              noValidate
              onSubmit={handleSubmit}
            >
              <FormErrorSummary show={showErrorSummary} />
              <FormSuccessBox show={submitted}>
                Signed in successfully. This is a demo form &mdash; no account
                data was sent anywhere.
              </FormSuccessBox>

              <FormField
                id="login-id"
                label="Ayushman Card / Employee ID / Registered Mobile Number"
                required
                autoComplete="username"
                error={errors["login-id"]}
                onBlur={handleBlur}
                onInput={handleInput}
              />
              <FormField
                id="login-password"
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                error={errors["login-password"]}
                onBlur={handleBlur}
                onInput={handleInput}
              />

              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>

            <p className="mt-6 flex items-start gap-2 rounded-sm bg-govt-blue-light px-3 py-2.5 text-xs leading-relaxed text-govt-gray-700">
              <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-govt-blue" />
              <span>
                This is a demonstration portal shared by beneficiaries,
                hospitals and programme staff. Live login is available on the
                official production BSSS system.
              </span>
            </p>
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
