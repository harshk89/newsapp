import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

export default function App() {

  const pageSize= 10;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
      <NavBar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Switch>
        {/* send key prop in every News component so that it reloads everytime when different news component is displayed */}
      <Route path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}/>
      <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}/>
      <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
      <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}/>
      <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/>}/>
      <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
      <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
        
      </Switch>
      </Router>
    </div>
  )
} 

