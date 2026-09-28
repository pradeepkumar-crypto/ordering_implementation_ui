import React from "react";
import { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function MyFormHelperText({ helper, focusedText }) {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return focusedText;
    }

    return helper;
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default MyFormHelperText;
