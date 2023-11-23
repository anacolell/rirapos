import { Snackbar, Alert, AlertColor } from "@mui/material";

type CustomSnackbarProps = {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
  severity: AlertColor;
};

export default function CustomSnackbar({
  open,
  onClose,
  message,
  severity,
}: CustomSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
