import React from "react";
import Input from "./wrapper_components/Input.WrapperComponent";
import { SvgIconProps } from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

const Search = (props: SvgIconProps) => {
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "16px",
      }}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon color="primary" />
      </IconButton>
      <Input />
    </Paper>
  );
};

export default Search;
