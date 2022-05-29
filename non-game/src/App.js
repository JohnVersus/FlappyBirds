import "./App.css";
import { useMoralis } from "react-moralis";
import MainButton from "./Component/Button/Button";

function App() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  function test() {
    alert("test");
  }

  // object structure { Function: logout, Name: "LogOut" }

  if (!isAuthenticated) {
    return (
      <div className="main CenterAll Vertical Spaces">
        <MainButton data={[{ Function: authenticate, Name: "Login" }]} />
      </div>
    );
  }
  if (isAuthenticated) {
    return (
      <div className="main CenterAll Vertical Spaces">
        <div className="MinterZone" id="MinterZone"></div>
        <MainButton
          data={[
            { Function: logout, Name: "LogOut" },
            { Function: test, Name: "Testing" },
          ]}
        />
      </div>
    );
  }
}
export default App;
