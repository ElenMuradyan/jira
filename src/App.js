import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import LoadingWrapper from "./components/sheard/LoadindWrapper";
import { AuthContext } from "./context/authContextProvider";
import { ROUTE_CONSTANTS, FIRESTORE_PATH_NAMES } from "./core/utilis/constants";
import { onAuthStateChanged } from 'firebase/auth';
import { Login, Register } from './pages/auth';
import { useEffect, useState } from 'react';
import { auth, db } from './services/firebase';
import { getDoc, doc } from "firebase/firestore";
import MainLayout from "./layouts/Main";
import Cabinet from './pages/cabinet';
import Profile from "./pages/profile";
import "./styles/global.css";

const App=()=>{
  const [ IsAuth, setIsAuth ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ userProfileInfo, setUserProfileInfo ] = useState({});
  
  const handleGetUserData = async (uid) => {
    const docRef = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
    const response = await getDoc(docRef);

    if(response.exists()){
      setUserProfileInfo(response.data());
    }
  }
  useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    user.uid && handleGetUserData(user.uid);
   
    setLoading(false);
    setIsAuth(Boolean(user));
  })
  },[]);

  return (
    <AuthContext.Provider value={{ IsAuth, userProfileInfo }}>
       <LoadingWrapper loading={loading}>
 <RouterProvider 
    router={
      createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={<MainLayout />}>
             <Route path={ROUTE_CONSTANTS.LOGIN} element={IsAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}></Route>
             <Route path={ROUTE_CONSTANTS.REGISTER} element={IsAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />}></Route>
             <Route path={ROUTE_CONSTANTS.CABINET} element={IsAuth ? <Cabinet/> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}></Route>
             <Route path={ROUTE_CONSTANTS.PROFILE} element={IsAuth ? <Profile/> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}></Route>
          </Route>
        )
      )
  }/>
    </LoadingWrapper>
    </AuthContext.Provider>
  )
}
export default App;