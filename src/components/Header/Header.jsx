import { Button } from 'antd';

import css from './Header.module.css';
import { AuthService } from '../../services/auth.service.js';
import {useEffect, useState} from "react";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        AuthService.getUser().then((user) => {
            setUser(user);
        })
    }, []);
    const logout = async () => {
        await AuthService.logout();
    }

    return (
        <div className={css.header}>
            <div className={css.userInfo}>
                <p>{user?.name}</p>
                <img src={user?.picture}/>
            </div>
            <Button onClick={logout}>
                Log Out
            </Button>
        </div>
    )
}

export {
    Header
}