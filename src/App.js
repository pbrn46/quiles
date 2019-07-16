import React from 'react'
import './App.scss'
import Main from './components/Main';
import { StoreProvider } from './store'

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Main />
      </div>
    </StoreProvider>
  )
}

export default App
