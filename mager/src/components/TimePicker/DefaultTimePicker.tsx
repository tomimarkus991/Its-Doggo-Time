import { TextField } from "@material-ui/core";
import { TimePicker as MTimePicker } from "@material-ui/pickers";

import { useColors } from "hooks";

interface Props {
  time: Date | null | undefined;
  onChange: (newTime: any) => void;
}

const DefaultTimePicker: React.FC<Props> = ({ time, onChange }) => {
  const { defaultReversedColor } = useColors();

  return (
    <MTimePicker
      ampm={false}
      value={time}
      inputProps={{
        style: { borderColor: defaultReversedColor },
      }}
      onChange={onChange}
      TextFieldComponent={params => {
        return (
          <TextField
            {...params}
            id="time"
            inputProps={{
              style: {
                textAlign: "center",
                color: defaultReversedColor,
                borderColor: defaultReversedColor,
                fontSize: "2rem",
                cursor: "pointer",
                caretColor: "transparent",
              },
            }}
            InputProps={{ disableUnderline: true }}
            variant="standard"
            color="primary"
          />
        );
      }}
    />
  );
};
export default DefaultTimePicker;
