import React from "react";
import AccordionTitle from "./AccordionTitle.WrapperComponent";
import AccordionContent from "./AccordionContent.Wrapper";
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
            <AccordionTitle
              title={stackDetail.topic}
              id={stackDetail.id}
              idColor="#6133BD"
            />
          }
          accordionContent={
            <AccordionContent
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
