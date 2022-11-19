import { useMoralis } from "react-moralis";
import console from "console";

function FetchUser() {
  const { authenticate, isAuthenticated } = useMoralis();
  function auth() {
    console.log("test me");
    if (!isAuthenticated) {
      console.log("Needs authentication");
      authenticate()
        .then(function (user) {
          console.log(user.get("ethAddress"));
          return {
            status: "User is authenticated",
          };
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <button className="Some styling" onClick={() => auth()}>
      Connect Wallet
    </button>
  );
}

export default FetchUser;
