import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import LoadingWrapper from "./components/sheard/LoadindWrapper";
import { AuthContext } from "./context/authContextProvider";
import { ROUTE_CONSTANTS } from "./core/utilis/constants";
import { onAuthStateChanged } from 'firebase/auth';
import { Login, Register } from './pages/auth';
import { useEffect, useState } from 'react';
import {auth } from './services/firebase';
import MainLayout from "./layouts/Main";
import Cabinet from './pages/cabinet';
import "./styles/global.css";

const App=()=>{
  const [ IsAuth, setIsAuth ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    setLoading(false);
    setIsAuth(Boolean(user));
  })
  },[]);

  return (
    <AuthContext.Provider value={{ x:10, IsAuth }}>
       <LoadingWrapper loading={loading}>
 <RouterProvider 
    router={
      createBrowserRouter(
        createRoutesFromElements(
          <Route path='/' element={<MainLayout />}>
             <Route path={ROUTE_CONSTANTS.LOGIN} element={IsAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}></Route>
             <Route path={ROUTE_CONSTANTS.REGISTER} element={IsAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />}></Route>
             <Route path={ROUTE_CONSTANTS.CABINET} element={IsAuth ? <Cabinet/> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}></Route>
          </Route>
        )
      )
  }/>
    </LoadingWrapper>
    </AuthContext.Provider>
  )
}
export default App;