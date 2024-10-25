import { Avatar, Dropdown, Typography, Flex, theme } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useNavigate } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/utilis/constants";
import './index.css';

const { Text } = Typography;
const { useToken } = theme; 

const AuthProfileDropDown = ({ userProfileInfo }) => {
    const { token } = useToken();
    const navigate = useNavigate();

    const setFullNameLetter = ({ firstName, lastName }) => {
        if (firstName && lastName){
            return `${firstName[0]} ${lastName[0]}`;
        };
        return '-';
    }
    const handleSignOut = async () => {
        try{
            await signOut(auth);
        }catch(error){
            console.log(error);
        }
    };

    const items = [
        {
            label: 'Profile',
            key:'0',
            onClick:() => navigate(ROUTE_CONSTANTS.PROFILE),
        },
        {
            label: 'Cabinet',
            key:'1',
            onClick:() => navigate(ROUTE_CONSTANTS.CABINET),
        },
        {
            label: 'Logout',
            key:'logout',
            onClick:handleSignOut,
        }
    ]

    return (
        <Dropdown 
        menu={{ items }} 
        trigger={['click']}
        dropdownRender={(menu) => {
            return(
                <div style={{
                    borderRadius: token.borderRadiusLG,
                    backgroundColor: token.colorBgElevated,
                    boxShadow: token.boxShadowSecondary,
                  }}>
                    <Flex vertical align="center" style={{padding:token.sizeMS}} className="profile_dropdown_container">
                        <Avatar src='https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'/>
                        <Text>{userProfileInfo.firstName} {userProfileInfo.lastName}</Text>
                        <Text type="secondary" underline>{userProfileInfo.email}</Text>
                    </Flex>
                    {menu}
                </div>
            )
        }}
        >
            <Avatar size={"large"} className="user_profile_avatar">
                {setFullNameLetter(userProfileInfo)}
            </Avatar>
        </Dropdown>
    );
};

export default AuthProfileDropDown