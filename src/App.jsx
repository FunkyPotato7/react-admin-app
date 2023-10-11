import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';

import { AuthService } from './services/auth.service.js';
import { LoginPage, NotFoundPage, ShopSettingsPage, ShopsPage } from './pages/index.js';
import { ServerError } from './components/index.js';

const App = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await AuthService.getToken();
            } catch (err) {
                setError(err);
            }
            if (!await AuthService.isAuthenticated()) {
                return AuthService.login();
            }
            AuthService.getUser().then((user) => {
                setUser(user);
            }).catch((err) => setError(err));
        })()
    }, []);

    if (!user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '400px' }}>
                <Spin size='large'/>
            </div>
        )
    }

    if (error) {
        return <ServerError/>
    }

    return (
    <Routes>
        <Route path={'/'} element={<ShopsPage user={user}/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/shop/:id'} element={<ShopSettingsPage/>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App