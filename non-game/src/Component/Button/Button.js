import "./Button.css";

function MainButton(props) {
  // props.data.map((e) => {
  //   alert(e.toString());
  // });
  return (
    // <>
    //   <button
    //     onClick={() => {
    //       Function();
    //     }}
    //   >
    //     {Name}
    //   </button>
    // </>
    <div className="dropdown">
      <div className="dropbtn">
        {props.MainName !== "" ? props.MainName : "Check Me"}
      </div>
      <div className="dropbtn-content">
        {props.data.map((e) => {
          return (
            <div
              onClick={() => {
                e.Function(e.FunctionParma);
              }}
              className={
                e.ButtonStyle === "Normal" ? "NormalButton" : "WarningButton"
              }
            >
              {e.Name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainButton;
