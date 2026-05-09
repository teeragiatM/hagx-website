import { Spinner } from "../core/spinner";

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <Spinner size="3" />
  </div>
);

export default LoadingScreen;
