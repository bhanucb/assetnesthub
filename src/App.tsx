import { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AppTheme from "./components/AppTheme";
import AppPopout from "./components/popout/AppPopout";
import NavigationRoutes from "./navigation/NavigationRoutes";
import { persistor, store } from "./state/Store";

const Loader: FC = () => {
  return <div>Loading...</div>;
};

function App() {
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
