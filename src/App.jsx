import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
