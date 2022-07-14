import { Grid } from "@mui/material";
import React from "react";
import AdditionalLinkItem from "./AdditionalLinkItem";

interface AdditionalLinkListProps {
  links: string[];
}

const AdditionalLinkList: React.FC<AdditionalLinkListProps> = ({ links }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {links.map((link) => {
          return (
            <Grid item xs={12} sm={12} md={12} lg={4} key={link}>
              <AdditionalLinkItem link={link} key={link} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default AdditionalLinkList;
