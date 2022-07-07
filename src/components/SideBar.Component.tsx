import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Icon from "./wrapper_components/Icon.WrapperComponent";

import Color from "../configs/ColorConfig";
import Stack from "../models/Stack.Model";

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
  };

  return (
    <List>
      {stacks.map((stack: Stack) => (
        <ListItem key={stack.id} disablePadding>
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
  );
};

const styles = {
  logo: {
    width: 26,
    height: 26,
  },
};

export default SideBar;
