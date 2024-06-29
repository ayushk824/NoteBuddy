
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <>
    <div className='conatiner'>
   <NoteState>
    <BrowserRouter> 
     <Navbar/>
      <Routes>
       
        <Route path="/" >
          
        <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          
        
         </Route>
         
      </Routes> 
    </BrowserRouter>
   
    </NoteState></div>
  
    </>
    
     
   
  );
}

export default App;
