import React, { useState } from "react";
import Step from "../../models/Step.Model";
import Accordion from "./Accordion.WrapperComponent";
import AccordionContent from "./AccordionContent.Wrapper";
import AccordionTitle from "./AccordionTitle.WrapperComponent";
import Theme from "../../configs/ThemeConfig";
import Color from "../../configs/ColorConfig";

interface AccordionListProps {
  steps: Step[];
}

const AccordionList: React.FC<AccordionListProps> = (props) => {
  const [expanded, setExpanded] = useState<string | false>();

  const handleAccordianChange =
    (id: string) =>
    (event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
      setExpanded(isExpanded ? id : false);
    };

  return (
    <div>
      {props.steps.map((step: Step) => (
        <Accordion
          expanded={expanded === step.id}
          onChange={handleAccordianChange(step.id)}
          key={step.id}
          iconColor={Theme.palette.secondary.main}
          accordionTitle={
            <AccordionTitle
              title={step.title}
              id={step.id}
              idColor={Theme.palette.primary.main}
            />
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
