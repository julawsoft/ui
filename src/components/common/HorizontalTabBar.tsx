// src/components/common/HorizontalTabBar.tsx
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface HorizontalTabBarProps {
  tabs: TabItem[];
  value: string;
  onChange: (newValue: string) => void;
  centered?: boolean;
}

const HorizontalTabBar: React.FC<HorizontalTabBarProps> = ({ tabs, value, onChange, centered = false }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered={centered}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            iconPosition={tab.icon ? "start" : undefined}
            value={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default HorizontalTabBar;
