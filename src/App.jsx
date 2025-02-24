import { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Grid } from "@mui/material";
import Header from "./layout/Header";
import SpotlightCard from "./components/SpotlightCard";
import Footer from "./layout/Footer";

import "/src/assets/js/solid.js";
import "/src/assets/js/light.js";
import "/src/assets/js/regular.js";
import "/src/assets/js/fontawesome.js";
import "/src/assets/js/duotone.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      danger: {
        main: "#f54336",
        contrastText: "#fff",
      },
    },
  });

  const btnDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} toggleDarkMode={btnDarkMode} />
        <Container sx={{ minHeight: "calc(100vh - 64px)", paddingTop: 4, paddingBottom: 5 }}>
          {/* <FontAwesomeIcon icon="fa-duotone fa-solid fa-spinner-third" spin /> */}

          <Typography
            variant="h4"
            component="h1"
            sx={{
              marginBottom: 3,
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2.125rem",
              },
            }}
          >
            Person Management
          </Typography>
          <SpotlightCard />
        </Container>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
