import { MainFrame } from "@/components/containers/MainFrame";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Chat } from "./components/chat/Chat";

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>();

  return (
    <MainFrame>
      <Box sx={containerStyle} className="smooth-pattern" component="main">
        <Chat chatId={Number(chatId)}></Chat>
      </Box>
    </MainFrame>
  );
};

const containerStyle = {
  display: "flex",
  height: "100%",
  flexDirection: "column",
  flexGrow: 1,
};
