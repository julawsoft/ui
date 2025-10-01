// src/components/common/VerticalTabBar.tsx
import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface VerticalTabBarProps {
  tabs: TabItem[];
  value: string;
  onChange: (newValue: string) => void;
}

const VerticalTabBar: React.FC<VerticalTabBarProps> = ({ tabs, value, onChange }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", height: "100%" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", minWidth: 180 }}
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

export default VerticalTabBar;
