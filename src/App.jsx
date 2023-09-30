import { Route, Routes } from 'react-router-dom';

import { ShopPage, ShopsListPage } from './pages/index.js';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ShopsListPage/>}/>
      <Route path={'/shop/:id'} element={<ShopPage/>}/>
    </Routes>
  )
}

export default App
