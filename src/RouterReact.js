import React,{Component} from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import App from './App'
import NotFound from './NotFound'
import AddLegend from './AddLegend'
import Navbar from './Navbar'
import MapFilter from './MapFilter'
import MapFilterWord from './MapFilterWord'
import RadioBrowserAPI from './RadioAPI'

 
const RouterReact = () =>(
    
    <Router>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/search' element={<MapFilter />}/>
            <Route path='/searchword' element={<MapFilterWord />}/>
            <Route path='/add' element={<AddLegend />}/>
            <Route path='radio' element={<RadioBrowserAPI />}/>
            <Route path='*' element={<NotFound />}/>
        </Routes>
    </Router>
    )
    
    export default RouterReact