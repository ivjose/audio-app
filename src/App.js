import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";

import AudioBar from "features/audioBar/AudioBar";

const theme = {
  colors: {
    primary: "#229ffb",
    secondary: "#556c86",
    white: "#ffffff",
    purple: "#8c6dea",
    dark: "#3a3a3a",
    yellow: "#ffd729",
    lightBlue: "#9dd1f7",
    lighterBlue: "#f3faff",
    lightGray: "#d0d9e2",
    lighterGray: "#eff3f7",
    lightPurple: "#ddd2ff",
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
            font-family: "Source Sans Pro", sans-serif;
            font-size: 18px;
            color: ${theme.colors.dark};
          }

          *,
          *::after,
          *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />

      <AudioBar />
    </ThemeProvider>
  );
}

export default App;
