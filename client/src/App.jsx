import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return <>{code ? <Dashboard code={code} /> : <Login />}</>;
}

export default App;
