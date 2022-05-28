import "./Button.css";

function MainButton({ Name, Function }) {
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
      <button class="dropbtn">Click Me</button>
      <div class="dropbtn-content">
        <div onClick={Function}>{Name}</div>
        <div onClick={Function}>{Name}</div>
      </div>
    </div>
  );
}

export default MainButton;
