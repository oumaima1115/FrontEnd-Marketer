import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Box } from "@mui/material";
import Tooltip from "./Tooltip";

const CardHeaderInfo = ({ text }) => {
  return (
    <Box
      sx={{
      position: "absolute",
      right: 16, 
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems : "center", }}
    >
      <Tooltip title={text}>
        <Box sx={{ cursor: "pointer" }}>
          <BsFillInfoCircleFill size={20} />
        </Box>
      </Tooltip>
    </Box>
  );
};
export default CardHeaderInfo;
