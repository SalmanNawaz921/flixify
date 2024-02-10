import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useState, useMemo } from "react";
export const ToggleModeContext = createContext();

const ToggleMode = ({ children }) => {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ToggleModeContext.Provider value={{ mode, setMode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleModeContext.Provider>
  );
};

export default ToggleMode;
