import './index.css';
import AuthProfileDropDown from '../../sheard/AuthProfileDropDown';
import { Button, Flex } from 'antd';

const Header=()=>{
    return(
    <div className="main_header">
       <Flex justify="space-between" align="center">
       <p>Logo</p>

       <div>
<AuthProfileDropDown/>
       </div>
       </Flex>
    </div>
         );
};

export default Header;