import { Routes, Route } from 'react-router-dom'

function Home() {
  return <h1>Home Page</h1>
}

function Intake() {
  return <h1>Intake Page</h1>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intake" element={<Intake />} />
    </Routes>
  )
}
