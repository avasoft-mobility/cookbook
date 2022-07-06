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
  const getIcon = (stack: string) => {
    if (stack === "React Native") {
      return <Icon type="reactNative" style={{ width: 30, height: 30 }} />;
    }

    if (stack === "Native Android") {
      return <Icon type="androidStudio" style={{ width: 30, height: 30 }} />;
    }

    if (stack === "Native Ios") {
      return <Icon type="swift" style={{ width: 30, height: 30 }} />;
    }

    if (stack === "Flutter") {
      return <Icon type="flutter" style={{ width: 30, height: 30 }} />;
    }

    if (stack === "Xamarin Forms") {
      return <Icon type="xamarin" style={{ width: 30, height: 30 }} />;
    }
  };

  return (
    <List>
      {props.Topics.map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            selected={text === props.selectedTopic ? true : false}
            onClick={() => props.onSelect(text)}
          >
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <ListItemText primary={text} style={{ color: "#000000" }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SideBar;
