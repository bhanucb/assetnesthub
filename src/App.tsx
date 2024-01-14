import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "./navigation/NavigationRoutes";
import AppTheme from "./components/AppTheme";
import { persistor, store } from "./state/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import AppPopout from "./components/popout/AppPopout";
import { homeLayoutKey } from "./api/Layouts";

const Loader: FC = () => {
  return <div>Loading...</div>;
};

function App() {
  // handle breaking changes
  useEffect(() => {
    const nextVersion = 1;
    const currentVersion = localStorage.getItem("version");
    if (currentVersion === null || nextVersion > Number(currentVersion)) {
      localStorage.removeItem(homeLayoutKey);
      localStorage.setItem("version", nextVersion.toString());
    }
  }, []);

  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <AppTheme>
            <AppPopout>
              <NavigationRoutes />
            </AppPopout>
          </AppTheme>
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
