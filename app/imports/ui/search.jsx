import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-buildings"
      options={test}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Building" />}
    />
  );
}
const test = [
  {label: "Building A"},
  {label: "Building B"},
  {label: "Building C"}
];
