import Chip from "@mui/material/Chip";

interface PillProps {
  label: string;
  color: string;
}

const VALID_PRE_DEFINED_COLORS = [
  "default",
  "primary",
  "secondary",
  "error",
  "info",
  "success",
  "warning",
];

type PillColors =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

const Pill: React.FC<PillProps> = (props) => {
  const IsHexColorCode = (colorCode: string): boolean => {
    return !VALID_PRE_DEFINED_COLORS.includes(colorCode);
  };

  return (
    <Chip
      label={props.label}
      variant="outlined"
      color={
        IsHexColorCode(props.color) ? "primary" : (props.color as PillColors)
      }
      sx={
        IsHexColorCode(props.color)
          ? { color: props.color, borderColor: props.color }
          : null
      }
    />
  );
};

export default Pill;
