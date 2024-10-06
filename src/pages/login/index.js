import { useState } from "react"

const Login = () => {
    let [count, setCount]=useState(0);

    const handleCountchange=()=>{
setCount(prevstate=>{return prevstate+1});
setCount(prevstate=>{return prevstate+1});
setCount(prevstate=>{return prevstate+1});
setCount(prevstate=>{return prevstate+1});
    };

    return(<div>
<button onClick={handleCountchange}>{count}</button>
    </div>)
}
export default Login