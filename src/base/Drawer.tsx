import * as React from "react";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    "& .MuiDrawer-paper": {
      width: "100%",
    },
  },
}));

const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <StyledDrawer anchor={"right"} open={open} onClose={onClose}>
      <Box sx={{ minWidth: 300 }} role="presentation">
        {children}
      </Box>
    </StyledDrawer>
  );
};

export default Drawer;
