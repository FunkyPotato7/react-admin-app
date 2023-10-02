import css from './ShopSettingPage.module.css';
import { ShopSettings } from '../../components/index.js';

const ShopSettingsPage = () => {
    return (
        <div className={css.main}>
            <ShopSettings/>
        </div>
    )
}

export {
    ShopSettingsPage
}