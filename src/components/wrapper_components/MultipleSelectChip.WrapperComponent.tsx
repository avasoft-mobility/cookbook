import * as React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectChipProps {
  inputLabel: string;
  values: string[];
  chipStyle?: React.CSSProperties;
  menuItemStyle?: React.CSSProperties;
  formControlStyle?: React.CSSProperties;
  selectStyle?: React.CSSProperties;
  defaultValues?: string[];
  onChange?: (
    event: SelectChangeEvent<string[]>,
    child: React.ReactNode
  ) => void;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

const MultipleSelectChip: React.FC<MultipleSelectChipProps> = ({
  inputLabel,
  values,
  chipStyle,
  formControlStyle,
  menuItemStyle,
  selectStyle,
  defaultValues,
  onChange,
  onClose,
}) => {
  const theme = useTheme();
  const [menuValues, setMenuValues] = React.useState<string[]>(
    defaultValues !== undefined ? defaultValues : []
  );

  useEffect(() => {
    if (defaultValues !== undefined) {
      setMenuValues(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (
    event: SelectChangeEvent<typeof menuValues>,
    child: React.ReactNode
  ) => {
    const {
      target: { value },
    } = event;
    setMenuValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange !== undefined ? onChange(event, child) : null;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }} style={formControlStyle}>
        <InputLabel id="demo-multiple-chip-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={menuValues}
          style={selectStyle}
          onChange={handleChange}
          onClose={onClose}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} style={chipStyle} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={{
                ...menuItemStyle,
                ...getStyles(value, menuValues, theme),
              }}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectChip;
