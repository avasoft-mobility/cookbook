import React from "react";
import Step from "../../models/Step.Model";
import Accordion from "./Accordion.WrapperComponent";
import AccordionContent from "./AccordionContent.Wrapper";
import AccordionTitle from "./AccordionTitle.WrapperComponent";

interface AccordionListProps {
  step: Step[];
}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  return (
    <div>
      {props.step.map((step: Step) => (
        <Accordion
          key={step.id}
          iconColor="#648DE5"
          accordionTitle={
            <AccordionTitle title={step.title} id={step.id} idColor="#6133BD" />
          }
          accordionContent={
            <AccordionContent
              content={step.description}
              code={step.code}
              contentColor="#424242"
              image={step.image}
            />
          }
        />
      ))}
    </div>
  );
};

export default AccordionList;
