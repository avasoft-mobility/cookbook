import React from "react";
import { useQuery } from "react-query";
import ApiService from "../../../services/ApiService";
import Text from "../../wrapper_components/Text.wrapperComponent";
import Theme from "../../../configs/ThemeConfig";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Color from "../../../configs/ColorConfig";

interface TopicsListProps {
  searchText?: string;
  onTopicSelected: Function;
}

const TopicsList: React.FC<TopicsListProps> = (props) => {
  const topicsCall = useQuery("topics", ApiService.getTopics);

  if (topicsCall.isLoading) {
    return <div>Loading</div>;
  }

  if (topicsCall.isSuccess) {
    return (
      <Card sx={{ minWidth: 275, padding: 0 }}>
        <CardContent sx={{ padding: 0 }}>
          <List>
            {topicsCall.data.map((topic, index) => {
              return (
                <>
                  <ListItem disablePadding key={topic._id}>
                    <ListItemButton
                      sx={{
                        "&:hover": {
                          backgroundColor: Color.primaryLight,
                        },
                        color: Color.primaryColor,
                      }}
                      onClick={() => {
                        props.onTopicSelected(topic.slug);
                      }}
                    >
                      <ListItemText primary={topic.title} />
                    </ListItemButton>
                  </ListItem>
                  {topicsCall.data?.length !== index + 1 ? (
                    <Divider variant="inset" component="li" />
                  ) : null}
                </>
              );
            })}
          </List>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const styles = {
  container: {},
};

export default TopicsList;
