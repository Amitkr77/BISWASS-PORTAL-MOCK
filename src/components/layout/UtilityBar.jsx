import { Link } from "react-router-dom";
import { useLang } from "../../hooks/useLang";
import { useFontSize } from "../../hooks/useFontSize";

export default function UtilityBar() {
  const { lang, toggleLang, t } = useLang();

  return (
    <div className="utility-bar">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <p className="font-medium">
          Government of Bihar <span aria-hidden="true">|</span> बिहार सरकार
        </p>
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
          <button
            type="button"
            onClick={toggleLang}
            className="font-size-btn !w-auto px-2"
            aria-label={
              lang === "hi"
                ? "Switch to English"
                : "हिन्दी में बदलें (Switch to Hindi)"
            }
          >
            {lang === "hi" ? "English" : "हिन्दी"}
          </button>
          <FontSizeControls t={t} />
          {/* <div className="hidden sm:flex items-center gap-3">
            <a href="https://www.facebook.com/" className="utility-link" aria-label="BSSS on Facebook (opens in new tab)" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com/" className="utility-link" aria-label="BSSS on Twitter (opens in new tab)" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <Link to="/contact/contact-us" className="utility-link">{t('Contact Us', 'संपर्क करें')}</Link>
          <Link to="/about/faq" className="utility-link">{t('FAQ', 'सामान्य प्रश्न')}</Link> */}
        </div>
      </div>
    </div>
  );
}

function FontSizeControls({ t }) {
  const { decrease, reset, increase } = useFontSize();
  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label="Adjust text size"
    >
      <span className="mr-1 hidden sm:inline">
        {t("Text Size:", "पाठ आकार:")}
      </span>
      <button
        type="button"
        onClick={decrease}
        className="font-size-btn"
        aria-label="Decrease text size"
      >
        A-
      </button>
      <button
        type="button"
        onClick={reset}
        className="font-size-btn"
        aria-label="Reset text size"
      >
        A
      </button>
      <button
        type="button"
        onClick={increase}
        className="font-size-btn"
        aria-label="Increase text size"
      >
        A+
      </button>
    </div>
  );
}
