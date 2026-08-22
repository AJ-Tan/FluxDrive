import ErrorImage from "../../assets/error-page/error-storyset.svg?react";
import PageLogo from "../../components/PageLogo/PageLogo";
import type { ErrorType } from "../../context/AppContext/AppProvider";
import "./errorPage.css";
import { useNavigate } from "react-router";

type ErrorPagePropsType = {
  defaultUrl: string;
  status: number;
  message: string;
  setError?: React.Dispatch<React.SetStateAction<ErrorType>> | null;
};

function ErrorPage({
  defaultUrl,
  status,
  message,
  setError,
}: ErrorPagePropsType) {
  const navigate = useNavigate();

  const handleGotoHome = () => {
    if (setError) {
      setError(null);
    }
    navigate(defaultUrl, { replace: true });
  };

  return (
    <div className="error-page">
      <div className="error-details">
        <button
          type="button"
          onClick={handleGotoHome}
          aria-label="Navigate to app."
          role="link"
        >
          <PageLogo />
        </button>
        <div className="error-header">
          <span>
            <span className="highlight">
              <b>{status}.</b>
            </span>{" "}
            That's an error.
          </span>
        </div>
        <p>
          <span className="highlight">{message}</span> That's all we know.
        </p>
      </div>
      <div className="error-image">
        <ErrorImage />
      </div>
    </div>
  );
}

export default ErrorPage;
