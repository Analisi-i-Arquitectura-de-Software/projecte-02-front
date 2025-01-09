import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { SectionTitle } from "@/components/SectionTitle";
import { ChatType } from "@/types/models";

interface CreateChatFormHeaderProps {
  chatType: ChatType;
  onChatTypeChange: (newValue: ChatType) => void;
}

export const CreateChatFormHeader: React.FC<CreateChatFormHeaderProps> = ({
  chatType,
  onChatTypeChange,
}) => {
  return (
    <Box component="header" sx={{ width: "100%", marginBottom: 3 }}>
      <SectionTitle title="Create Chat" />
      <Tabs
        value={chatType}
        onChange={(_e, newValue) => onChatTypeChange(newValue)}
        variant="fullWidth"
        TabIndicatorProps={tabIndicatorProps}
        sx={tabsStyle}
      >
        <Tab label="Direct Chat" value={ChatType.DIRECT} />
        <Tab label="Group Chat" value={ChatType.GROUP} />
      </Tabs>
    </Box>
  );
};

const tabIndicatorProps = {
  style: {
    backgroundColor: "var(--color-medium-purple)",
  },
};

const tabsStyle = {
  marginBottom: 3,
  "& .Mui-selected": {
    color: "var(--color-medium-purple) !important",
  },
};
