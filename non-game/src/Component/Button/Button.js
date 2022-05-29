import "./Button.css";

function MainButton(props) {
  props.map((e) => {
    alert(e.Function);
  });
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
      <div class="dropbtn">Click Me</div>
      <div class="dropbtn-content">
        {props.map((e) => {
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
