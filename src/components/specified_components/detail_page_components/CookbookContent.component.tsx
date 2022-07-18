import React from "react";
import Cookbook from "../../../models/Cookbook.Model";
import AccordionList from "../../wrapper_components/AccordionList.WrapperComponent";
import AuthorItem from "./AuthorItem.Component";

interface CookbookContentProps {
  cookbook?: Cookbook;
}
const CookbookContent: React.FC<CookbookContentProps> = (props) => {
  return (
    <div>
      <AccordionList steps={props.cookbook ? props.cookbook.steps : []} />
      {props.cookbook && props.cookbook.author ? (
        <AuthorItem name={props.cookbook ? props.cookbook?.author?.name : ""} />
      ) : null}
    </div>
  );
};

export default CookbookContent;
