import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ConfirmationDialogRowProps {
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: Function;
  dialogValues: string[];
  DialogHeader: string;
}

const ConfirmationDialogRow: React.FC<ConfirmationDialogRowProps> = (props) => {
  const { value: valueProp, open } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleOk = () => {
    props.onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      keepMounted={props.keepMounted}
    >
      <DialogTitle sx={{ color: "black" }}>{props.DialogHeader}</DialogTitle>

      <DialogContent dividers>
        <RadioGroup
          sx={{ color: "black" }}
          ref={radioGroupRef}
          value={value}
          onChange={handleChange}
        >
          {props.dialogValues.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogRow;
