import React from "react";
import AccordianTitle from "./AccordianTitle.WrapperComponent";
import AccordianContent from "./AccordianContent.Wrapper";
import { Accordion } from "@mui/material";
import StackDetail from "../../models/TopicDatas.model";

interface AccordianProps {
  stackDetails: StackDetail[];
}

const Accordian: React.FC<AccordianProps> = (props) => {
  return (
    <div>
      {props.stackDetails.map((singleData: StackDetail) => (
        <Accordion
          sx={{
            marginTop: 3,
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <AccordianTitle
            title={singleData.topic}
            id={singleData.id}
            iconColor="#648DE5"
            idColor="#6133BD"
          />
          <AccordianContent content={singleData.content} />
        </Accordion>
      ))}
    </div>
  );
};

export default Accordian;
