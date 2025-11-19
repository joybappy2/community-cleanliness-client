import errorpng from "../assets/error.png";

const ErrorPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <img className="max-w-3xl mx-auto" src={errorpng} alt="" />
    </div>
  );
};

export default ErrorPage;
