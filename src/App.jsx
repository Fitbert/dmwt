import { Routes, Route } from 'react-router-dom'
import Home      from './pages/Home'
import Intake    from './pages/Intake'
import Dashboard from './pages/Dashboard'
import ThankYou  from './pages/ThankYou'
 
export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/intake"    element={<Intake />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  )
}
 