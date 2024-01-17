import { Bars } from "react-loader-spinner";
import "./style.css";

export default function LoadingAnimation() {
  // modal overlay with a loading animation in the center
  return (
    <div className="overlay">
      <Bars color="white" width={80} height={80} />
    </div>
  );
}
