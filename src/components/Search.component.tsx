import React, { useState } from "react";
import Input from "./wrapper_components/Input.WrapperComponent";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
interface SearchProps {
  input: Function;
}
const Search: React.FC<SearchProps> = (props) => {
  const onChange = (text: string) => {
    props.input(text);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        height: "50px",
      }}
    >
      <div style={styles.searchIconContainer}>
        <SearchIcon color="primary" />
      </div>
      <Input
        onChange={(event) => {
          onChange(event.target.value);
        }}
        multiline={false}
        placeholderStyle={{
          color: "#D3DFF8",
          fontFamily: "Lato",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "25px",
          lineHeight: "47px",
        }}
      />
    </Paper>
  );
};
const styles = {
  searchIconContainer: {
    marginLeft: "10px",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
  },
};

export default Search;
