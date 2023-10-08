import { useEffect } from 'react';
import { Spin } from 'antd';

import { AuthService } from '../../services/auth.service.js';

const LoginPage = () => {
    // useEffect(() => {
    //     login();
    // },[])

    const login = async () => {
       await AuthService.login();
    }

    return (
        <div style={{ width: '100%', height: '800px', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin size='large'/>
            <button onClick={login}>Login</button>
        </div>
    )
}

export {
    LoginPage
}

