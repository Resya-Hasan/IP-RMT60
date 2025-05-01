import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
