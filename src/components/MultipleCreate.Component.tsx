import React, { useState } from "react";

import Clickable from "./wrapper_components/ButtonWrapperComponent";
import Icon from "./wrapper_components/Icon.WrapperComponent";
import IconButton from "./wrapper_components/IconButton.WrapperComponent";

interface MultipleCreateProps {
  children: React.ReactNode;
}

export const MultipleCreate: React.FC<MultipleCreateProps> = ({ children }) => {
  const [child, setChild] = useState<React.ReactNode[]>([children]);

  const addMore = () => {
    let newChild: any[] = [];
    newChild = child.slice(0);
    newChild.push(children);
    setChild(newChild);
  };

  const deleteChild = (index: number) => {
    if (child.length === 1) {
      return;
    }

    let newChild: any[] = [];
    child.splice(index, 1);
    newChild = child.slice(0);
    setChild(newChild);
  };

  return (
    <div>
      <div style={style.parentContainer}>
        {child.map((value, index) => {
          return (
            <div
              key={index}
              style={{
                ...style.childContainer,
                ...{ flexDirection: "column" },
              }}
            >
              <div style={style.subChildContainer}>
                {value}
                <IconButton
                  color={"primary"}
                  onClick={() => {
                    deleteChild(index);
                  }}
                >
                  <Icon type={"delete"} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>

      <div style={style.buttonContainer}>
        <Clickable
          variant={"contained"}
          clickableSize={"large"}
          ClickableText={"ADD NEW"}
          onClick={() => {
            addMore();
          }}
        />
      </div>
    </div>
  );
};

const style = {
  parentContainer: {
    flex: 1,
  },
  childContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    paddingBottom: "10px",
  },
  subChildContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "40px",
  },
};

export default MultipleCreate;
