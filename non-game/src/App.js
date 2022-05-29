import "./App.css";
import { useMoralis } from "react-moralis";
import MainButton from "./Component/Button/Button";

function App() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  function test() {
    alert("Test");
  }

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
        <MainButton
          ButtonData={[
            { Function: logout, Name: "Logout" },
            { Function: test, Name: "test" },
          ]}
        />
      </div>
    );
  }
}
export default App;
