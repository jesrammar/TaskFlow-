import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element= {<h1>Home Page</h1>}/>
          <Route path="/login" element= {<Login/>}/>
          <Route path="/register" element= {<Register/>}/>
          <Route path="/tasks" element= {<h1>Tasks</h1>}/>
          <Route path="/add-task" element= {<h1>Add Task</h1>}/>
          <Route path="/tasks/:id" element= {<h1>Update Task</h1>}/>
          <Route path="/profile" element= {<h1>Prifile</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}



export default App;