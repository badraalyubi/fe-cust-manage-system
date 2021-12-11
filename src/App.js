import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Main from './Pages/Main';
import { Dashboard } from './Views/Dashboard';
import { Tasks } from './Views/Tasks';
import { TaskEditor } from './Views/TaskEditor';
import { Login } from './Views/Auth/Login';
import { isLoggedIn } from './services/utils';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} exact>
            <Route path='dashboard' element={<Dashboard />} index />
            <Route index path='tasks' element={<Tasks />} />
            <Route path='tasks/create' element={<TaskEditor />} />
            <Route path='tasks/:id' element={<TaskEditor />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
