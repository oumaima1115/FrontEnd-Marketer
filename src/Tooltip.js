import { Tooltip } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#202124cf",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#202124cf",
    fontSize: 14,
    textAlign: "justify",
  },
}));

export default function MyTooltip({ title, children }) {
  return (
    <BootstrapTooltip title={title} TransitionComponent={Zoom} arrow>
      {children}
    </BootstrapTooltip>
  );
}
