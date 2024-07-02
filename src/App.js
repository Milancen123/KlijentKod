import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import PrivateScreenRide from "./components/screens/PrivateScreenRide";
import PrivateScreenHistory from "./components/screens/privateScreenHistory";
import DriverPrivateScreen from "./components/screens/DriverPrivateScreen";

const App = () => {
  return (
    <Router>
      <Routes>

      <Route path="/history" element={<PrivateScreenHistory/>}/>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivateScreen />
            </PrivateRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <PrivateRoute>
              <DriverPrivateScreen/>
            </PrivateRoute>
          }
        />
        

        <Route
          path="/ride/:ride_id"
          element={
            <PrivateRoute>
              <PrivateScreenRide />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
