import {BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';


function App() {
  return (
    <>  
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route path="/users" element={<User/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
