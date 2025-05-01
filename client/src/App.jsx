import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
