import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Icon from "../../wrapper_components/Icon.WrapperComponent";

import Color from "../../../configs/ColorConfig";
import Stack from "../../../models/Stack.Model";
import React from "react";
import AdditionalLinkMenuItem from "../additional_link_components/AdditionalLinkMenuItem";

interface SideBarProps {
  selectedStack: string;
  stacks: Stack[];
  onSelect: Function;
}

const SideBar: React.FC<SideBarProps> = ({
  stacks,
  onSelect,
  selectedStack,
}) => {
  const getIcon = (stackName: string) => {
    if (stackName === "React Native") {
      return <Icon type="reactNative" style={styles.logo} />;
    }

    if (stackName === "Native Android") {
      return <Icon type="androidStudio" style={styles.logo} />;
    }

    if (stackName === "Native Ios") {
      return <Icon type="swift" style={styles.logo} />;
    }

    if (stackName === "Flutter") {
      return <Icon type="flutter" style={styles.logo} />;
    }

    if (stackName === "Xamarin Forms") {
      return <Icon type="xamarin" style={styles.logo} />;
    }

    if (stackName === "links") {
      return (
        <Icon
          type="links"
          style={{ ...styles.logo, ...{ color: Color.primaryColor } }}
        />
      );
    }
  };

  return (
    <div>
      <List>
        {stacks.map((stack: Stack) => (
          <ListItem key={stack._id} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor:
                  stack.name === selectedStack ? Color.primaryTintColor : null,
                "&:hover": {
                  backgroundColor: Color.primaryLight,
                },
              }}
              onClick={() => onSelect(stack.name)}
            >
              <ListItemIcon>{getIcon(stack.name)}</ListItemIcon>
              <ListItemText
                primary={stack.name}
                style={{ color: Color.textSecondaryColor }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <AdditionalLinkMenuItem
          onSelect={() => {
            onSelect("additional_links");
          }}
          icon={getIcon("links")}
        />
      </List>
    </div>
  );
};

const styles = {
  logo: {
    width: 26,
    height: 26,
  },
};

export default SideBar;
