import AuthProfileDropDown from '../../sheard/AuthProfileDropDown';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContextProvider';
import { Flex, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../../core/utilis/constants';
import { useSelector } from 'react-redux';
import './index.css';

const Header=()=>{
   const { count } = useSelector(store => store.userProfile);

   const { IsAuth, userProfileInfo } = useContext(AuthContext);

   return(
    <div className="main_header">
       <Flex justify="space-between" align="center">
       <p>{ count }</p>

       <div>
        {
           IsAuth ? <AuthProfileDropDown userProfileInfo={userProfileInfo}/> : <Link to={ROUTE_CONSTANTS.LOGIN}><Button>Sign in</Button></Link>
        }      
       </div>
       </Flex>
    </div>
         );
};

export default Header;