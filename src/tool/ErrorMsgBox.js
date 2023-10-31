import { Box, Typography } from "@mui/material";
import { ErrorMsg, ErrorMsgIconButton } from "../styles/tool";
import { Colors } from "../styles/theme";
import CachedIcon from "@mui/icons-material/Cached";

function ErrorMsgBox() {
  return (
    <ErrorMsg>
      <Typography variant="h5" color={Colors.greyText}>
        資料讀取失敗
      </Typography>
      <Box>
        <ErrorMsgIconButton
          onClick={() => {
            window.location.reload();
          }}
        >
          <CachedIcon sx={{ color: Colors.greyText }} />
        </ErrorMsgIconButton>
      </Box>
    </ErrorMsg>
  );
}

export default ErrorMsgBox;
