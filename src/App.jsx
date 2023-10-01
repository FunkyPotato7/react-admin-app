import { Route, Routes } from 'react-router-dom';

import { NotFoundPage, ShopSettingsPage, ShopsPage } from './pages/index.js';

const App = () => {
  return (
    <Routes>
        <Route path={'/'} element={<ShopsPage/>}/>
        <Route path={'/shop/:id'} element={<ShopSettingsPage/>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
