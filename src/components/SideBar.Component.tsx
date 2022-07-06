import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Icon from "./wrapper_components/Icon.WrapperComponent";

interface SideBarProps {
  selectedTopic: string;
  Topics: string[];
  onSelect: Function;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const getIcon = (stackName: string) => {
    if (stackName === "React Native") {
      return <Icon type="reactNative" style={{ width: 30, height: 30 }} />;
    }

    if (stackName === "Native Android") {
      return <Icon type="androidStudio" style={{ width: 30, height: 30 }} />;
    }

    if (stackName === "Native Ios") {
      return <Icon type="swift" style={{ width: 30, height: 30 }} />;
    }

    if (stackName === "Flutter") {
      return <Icon type="flutter" style={{ width: 30, height: 30 }} />;
    }

    if (stackName === "Xamarin Forms") {
      return <Icon type="xamarin" style={{ width: 30, height: 30 }} />;
    }
  };

  return (
    <List>
      {props.Topics.map((stackName) => (
        <ListItem key={stackName} disablePadding>
          <ListItemButton
            selected={stackName === props.selectedTopic ? true : false}
            onClick={() => props.onSelect(stackName)}
          >
            <ListItemIcon>{getIcon(stackName)}</ListItemIcon>
            <ListItemText primary={stackName} style={{ color: "#000000" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SideBar;
