/*
import { useState } from "react";
import VerticalTabBar from "../components/common/VerticalTabBar";
import HorizontalTabBar from "../components/common/HorizontalTabBar";
import { Box, Typography } from "@mui/material";
import { Home, Settings, Info } from "@mui/icons-material";

const TabsExample = () => {
  const [verticalValue, setVerticalValue] = useState("home");
  const [horizontalValue, setHorizontalValue] = useState("home");

  const tabs = [
    { label: "Home", value: "home", icon: <Home /> },
    { label: "Configurações", value: "settings", icon: <Settings /> },
    { label: "Sobre", value: "about", icon: <Info /> },
  ];

  return (
    <Box sx={{ display: "flex", gap: 4, p: 3 }}>
      <Box sx={{ width: 250 }}>
        <VerticalTabBar
          tabs={tabs}
          value={verticalValue}
          onChange={setVerticalValue}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Conteúdo da aba: {verticalValue}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <HorizontalTabBar
          tabs={tabs}
          value={horizontalValue}
          onChange={setHorizontalValue}
          centered
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Conteúdo da aba: {horizontalValue}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TabsExample;

*/