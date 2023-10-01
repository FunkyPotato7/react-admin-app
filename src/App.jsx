import { Route, Routes } from 'react-router-dom';

import { ShopSettingsPage, ShopsPage } from './pages/index.js';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ShopsPage/>}/>
      <Route path={'/shop/:id'} element={<ShopSettingsPage/>}/>
    </Routes>
  )
}

export default App
