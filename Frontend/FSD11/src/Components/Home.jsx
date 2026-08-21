import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import {image} from './assets/img.jpeg'
export const Home = () => {
return (
    <div>Home
        <img src={image} alt="Home" />
    </div>)
}
