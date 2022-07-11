import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ConfirmationDialogRow from "./ConfirmationDialogRow.WrapperComponent";

interface ConfirmationDialogProps {
  title: string;
  dialogValues: string[];
  value: Function;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Choose the Topic");

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
    props.value(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List component="div" role="group">
        <ListItem button divider aria-haspopup="true" onClick={openDialog}>
          <ListItemText primary={props.title} secondary={value} />
        </ListItem>
        <ConfirmationDialogRow
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          dialogValues={props.dialogValues}
          DialogHeader="Topics"
        />
      </List>
    </Box>
  );
};

export default ConfirmationDialog;