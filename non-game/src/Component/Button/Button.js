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
    <div class="dropdown">
      <div class="dropbtn">Check Me</div>
      <div class="dropbtn-content">
        {props.data.map((e) => {
          return (
            <div
              onClick={() => {
                e.Function();
              }}
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
