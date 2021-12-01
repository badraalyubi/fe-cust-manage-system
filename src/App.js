import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './Pages/Main';
import Blank from './Pages/Blank';
import { Dashboard } from './Views/Dashboard';
import { Tasks } from './Views/Tasks';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} exact>
            <Route path='dashboard' element={<Dashboard />} exact />
            <Route path='tasks' element={<Tasks />} />
          </Route>
          <Route path='/login' element={<Blank />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
