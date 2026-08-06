type ErrorPagePropsType = {
  status: number;
  title: string;
  description: string;
};

function ErrorPage({ status, title, description }: ErrorPagePropsType) {
  return (
    <div>
      <div className="error-header">
        <span>
          <b>{status}</b> {title}
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
