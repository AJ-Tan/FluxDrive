import "./loadingPage.css";
import loadingGIF from "../../assets/gifs/loading.gif";
function LoadingPage({ loadingText }: { loadingText: string }) {
  return (
    <div className="loading-page">
      <div className="loading-details">
        <div className="loading-icon-container">
          <img src={loadingGIF} alt="" />
        </div>
        <p>{loadingText}</p>
      </div>
    </div>
  );
}

export default LoadingPage;
