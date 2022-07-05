import React from "react";
import Input from "./wrapper_components/Input.wrapper.component";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props: SvgIconProps) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: "16px",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div style={styles.searchIconContainer}>
        <SearchIcon />
      </div>
      <Input />
    </div>
  );
};
const styles = {
  searchIconContainer: {
    height: "40px",
    display: "flex",
    alignItems: "center",
  },
};

export default Search;
