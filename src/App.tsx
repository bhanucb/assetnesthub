import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationRoutes from "./navigation/NavigationRoutes";
import AppTheme from "./components/AppTheme";
import { persistor, store } from "./state/Store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import AppPopout from "./components/popout/AppPopout";

export const BASENAME = "/asset-nest-hub";

const Loader: FC = () => {
  return <div>Loading...</div>;
};

function App() {
  return (
    <BrowserRouter basename={BASENAME}>
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
