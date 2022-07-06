import React, { useState } from "react";
import Input from "./wrapper_components/Input.WrapperComponent";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
interface SearchProps {
  input: Function;
}
const Search: React.FC<SearchProps> = (props) => {
  const inputText = (text: string) => {
    props.input(text);
  };
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "16px",
        marginTop: "10px",
      }}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon color="primary" />
      </IconButton>
      <Input input={inputText} />
    </Paper>
  );
};

export default Search;
