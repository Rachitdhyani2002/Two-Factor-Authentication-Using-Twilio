import { Route, Routes } from 'react-router-dom';
import './App.css';
import LogInForm from './pages/auth/LogInForm/LogInForm';
import RegisterForm from './pages/auth/RegisterForm/RegisterForm';

function App() {
  return (
    <div className="App">
     <Routes>
         <Route path='/' element={<LogInForm/>}/>
         <Route path='/register' element={<RegisterForm/>}/>
     </Routes>
    </div>
  );
}

export default App;
