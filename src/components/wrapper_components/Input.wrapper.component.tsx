import React from "react";

const Input = () => {
  return (
    <div style={{ width: "97%" }}>
      <input
        style={styles.inputContainer}
        type="text"
        id="inputID"
        placeholder="Explore the topics..."
      />
    </div>
  );
};
const styles = {
  inputContainer: {
    borderRadius: "none",
    borderWidth: "0px",
    outline: "none",
    width: "100%",
    height: "50px",
    display: "flex",
    fontSize: "20px",
  },
};

export default Input;
