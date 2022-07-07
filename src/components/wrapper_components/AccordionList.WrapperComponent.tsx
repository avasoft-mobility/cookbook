import React from "react";
import Step from "../../models/Step.Model";
import Accordion from "./Accordion.WrapperComponent";
import AccordionContent from "./AccordionContent.Wrapper";
import AccordionTitle from "./AccordionTitle.WrapperComponent";
import Theme from '../../configs/ThemeConfig'
import Color from '../../configs/ColorConfig'

interface AccordionListProps {
  steps: Step[];
}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  return (
    <div>
      {props.steps.map((step: Step) => (
        <Accordion
          key={step.id}
          iconColor={Theme.palette.secondary.main}
          accordionTitle={
            <AccordionTitle title={step.title} id={step.id} idColor={Theme.palette.primary.main} />
          }
          accordionContent={
            <AccordionContent
              content={step.description}
              code={step.code}
              contentColor={Color.texttertiaryColor}
              image={step.image}
            />
          }
        />
      ))}
    </div>
  );
};

export default AccordionList;
