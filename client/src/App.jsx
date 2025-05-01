import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignIn';

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
