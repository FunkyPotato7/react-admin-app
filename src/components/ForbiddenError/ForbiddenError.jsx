import { Button, Result } from 'antd';

import css from './ForbiddenError.module.css';
import { AuthService } from '../../services/auth.service.js';

const ForbiddenError = () => {
    const handleBackClick = async () => {
        await AuthService.logout();
    }

    return (
        <div className={css.page}>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you have no permission to access this page."
                extra={<Button type="primary" onClick={handleBackClick}>Back to login</Button>}
            />
        </div>
    )
}

export {
    ForbiddenError,
}