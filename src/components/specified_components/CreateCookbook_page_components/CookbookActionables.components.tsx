import React, { MouseEventHandler } from "react";
import ActionableDropdown from "../actionable_components/ActionableDropdown.component";
import Topic from "../../../models/Topic.Model";
import { UseQueryResult } from "react-query";
import Stack from "../../../models/Stack.Model";
import ActionableComboBox from "../actionable_components/ActionableComboBox.component";
import Author from "../../../models/Author.Model";

interface CookbookActionablesProps {
  TopicDialogValues: UseQueryResult<Topic[]>;
  onTopicChosed: Function;
  onClickAddTopic: MouseEventHandler<HTMLButtonElement>;
  confirmationTopicDialogValues: string;
  StackDialogValues: UseQueryResult<Stack[]>;
  onStackChosed: Function;
  onClickAddStack: MouseEventHandler<HTMLButtonElement>;
  confirmationStackDialogValues: string;
  onClickAddAuthor: MouseEventHandler<HTMLButtonElement>;
  onAuthorChanged: Function;
  authorOptions: UseQueryResult<Author[]>;
  authorValue: string;
}

const CookbookActionables: React.FC<CookbookActionablesProps> = (props) => {
  return (
    <div>
      <ActionableDropdown
        dialogValues={
          props.TopicDialogValues.data
            ? props.TopicDialogValues.data.map((topic) => topic.title)
            : []
        }
        onConfirm={props.onTopicChosed}
        onClickableClick={props.onClickAddTopic}
        dialogTitle={"Topic"}
        dialogHeader={"Choose Topic"}
        confirmationDialogvalue={props.confirmationTopicDialogValues}
        clickableText={"Add Topic"}
      />
      <ActionableDropdown
        dialogValues={
          props.StackDialogValues.data
            ? props.StackDialogValues.data.map((stack) => stack.name)
            : []
        }
        onConfirm={props.onStackChosed}
        onClickableClick={props.onClickAddStack}
        dialogTitle={"Stack"}
        dialogHeader={"Choose Stack"}
        confirmationDialogvalue={props.confirmationStackDialogValues}
        clickableText={"Add Stack"}
      />
      <ActionableComboBox
        title={"Authors"}
        onClickableClick={props.onClickAddAuthor}
        label={"Authors"}
        clickableText={"Add Author"}
        onChanged={props.onAuthorChanged}
        options={
          props.authorOptions.isSuccess
            ? props.authorOptions.data.map((author) => author.name)
            : [""]
        }
        defaultValue={props.authorValue}
      />
    </div>
  );
};

export default CookbookActionables;
