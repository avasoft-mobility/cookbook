import React from "react";
import AccordianTitle from "./AccordianTitle.WrapperComponent";
import AccordianContent from "./AccordianContent.Wrapper";
import StackDetail from "../../models/StackDetails.model";
import Accordion from "./Accordion.WrapperComponent";

interface AccordionListProps {
  stackDetails: StackDetail[];
}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  return (
    <div>
      {props.stackDetails.map((stackDetail: StackDetail) => (
        <Accordion
          key={stackDetail.id}
          iconColor="#648DE5"
          accordionTitle={
            <AccordianTitle
              title={stackDetail.topic}
              id={stackDetail.id}
              idColor="#6133BD"
            />
          }
          accordionContent={
            <AccordianContent
              content={stackDetail.content}
              code={stackDetail.code}
              contentColor="#424242"
              image={stackDetail.image}
            />
          }
        />
      ))}
    </div>
  );
};

export default AccordionList;
