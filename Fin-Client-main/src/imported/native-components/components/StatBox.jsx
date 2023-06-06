import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../native-components/theme";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
            fontSize="24px"
          >
            {title}
          </Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography
          variant="h5"
          sx={{ color: colors.greenAccent[500], fontSize: "16px" }}
        >
          {subtitle}
        </Typography>
        <div></div>
      </Box>
    </Box>
  );
};

export default StatBox;
