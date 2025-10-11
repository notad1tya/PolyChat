import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import FriendsPage from './Pages/FriendsPage';
import NotificationPage from './Pages/NotificationPage';
import CallPage from './Pages/CallPage';
import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import OnboardingPage from './Pages/OnboardingPage';
import SignUpPage from './Pages/SignUpPage';
import { Toaster, toast } from 'react-hot-toast';
import useAuthUser from './hooks/useAuthUser';
import PageLoader from './components/PageLoader';
import Layout from './components/Layout';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  //Tanstack query
  const {isLoading, authUser} = useAuthUser();
  const{theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
   console.log(isOnboarded)
   console.log(isAuthenticated)
  if(isLoading) {
    return <PageLoader/>
  }


  return (
    <div className='h-screen' data-theme= {theme}>
      <Routes>
        <Route path="/" 
        element = 
        {isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage/>
          </Layout>
        ) : (
          <Navigate to ={!isAuthenticated ? "/login" : "/onboarding"}/>
            )
          }
        />
        <Route path="/signup"
         element= {
            !isAuthenticated ? <SignUpPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>
          }
        />
        <Route path="/login"
           element={
              !isAuthenticated ? <LoginPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>
            }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
         <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route path="/onboarding"
         element= {
          isAuthenticated ?(
            !isOnboarded?(
              <OnboardingPage/>
            ) : (
              <Navigate to="/"/>
            )
            ) : (
            <Navigate to="/login"/>
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
    
  )
}

export default App;