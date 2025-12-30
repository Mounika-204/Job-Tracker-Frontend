import{Routes,Route,Router} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate} from "react-router-dom";

function App(){
  return(
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/add-job" element={<ProtectedRoute><AddJob /></ProtectedRoute>}/>
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>}/>
    </Routes>
  );
}
export default App;

