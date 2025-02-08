import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage"


function App(){
  return(

    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<HomePage/>}/>
          <Route path="/login" element= {<Login/>}/>
          <Route path="/register" element= {<Register/>}/>
          <Route path="/tasks" element= {<TaskPage/>}/>
          <Route path="/add-task" element= {<TaskFormPage/>}/>
          <Route path="/tasks/:id" element= {<TaskFormPage/>}/>
          <Route path="/profile" element= {<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>


    </AuthProvider>

   
  )
}



export default App;