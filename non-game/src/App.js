import "./App.css";
import { useMoralis } from "react-moralis";
import MainButton from "./Component/Button/Button";

function App() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div className="main CenterAll Vertical Spaces">
        <MainButton Function={authenticate} Name="Click Me" />
      </div>
    );
  }
  if (isAuthenticated) {
    return (
      <div className="main CenterAll Vertical Spaces">
        <div className="MinterZone" id="MinterZone"></div>
        <MainButton Function={logout} Name="Click Me" />
      </div>
    );
  }
}
export default App;
