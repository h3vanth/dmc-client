import { ThemeProvider, createTheme } from "@mui/material/styles";

import Layout from "./components/layout";
import AppRoutes from "./routes";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
