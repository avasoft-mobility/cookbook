import Chip from "@mui/material/Chip";

interface PillProps {
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}

const Pill: React.FC<PillProps> = (props) => {
  return <Chip label={props.label} variant="outlined" color={props.color} />;
};

export default Pill;
