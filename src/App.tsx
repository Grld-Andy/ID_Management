import './App.css'
import {Routes, Route} from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
