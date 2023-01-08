import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import "./styles/app.scss";
import { v4 } from 'uuid';

function App() {


  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path={`/:id`} element={
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          } />
          <Route path="/" element={<Navigate to={`${v4()}`} />}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
