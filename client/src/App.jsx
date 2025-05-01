import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthLayout from './layout/AuthLayout';
import JobDetail from './pages/DetailJob';
import MyRoadmaps from './pages/MyRoadmaps';
import DetailRoadmap from './pages/DetailRoadmap';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes >
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />

          <Route path="/" element={<AuthLayout />} >
            <Route index element={<HomePage />} />
            <Route path="/detail-job/:id" element={<JobDetail />} />
            <Route path="/my-roadmaps" element={<MyRoadmaps />} />
            <Route path="/my-roadmaps/:id" element={<DetailRoadmap />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
