import { Route, Routes } from 'react-router-dom';

import { LoginPage, NotFoundPage, ShopSettingsPage, ShopsPage } from './pages/index.js';
import { AuthenticationGuard } from './components/authentication-guard.jsx';

const App = () => {

    return (
    <Routes>
        <Route path={'/'} element={<ShopsPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/shop/:id'} element={<AuthenticationGuard component={ShopSettingsPage}/>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App