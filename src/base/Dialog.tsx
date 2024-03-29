import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { DialogProps, DialogTitleProps } from "../types";

const BootstrapDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={(event) => onClose(event, false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  buttonLabel,
  fullScreen = false,
  disableButton = false,
}) => {
  const handleClose = (event: React.SyntheticEvent | {}, clicked: boolean) => {
    onClose(event, clicked);
  };

  return (
    <BootstrapDialog
      onClose={(event) => {
        handleClose(event, false);
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullScreen={fullScreen}
      maxWidth="md"
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={(event) => onClose(event, true)}
          disabled={disableButton}
        >
          {buttonLabel}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default Dialog;
