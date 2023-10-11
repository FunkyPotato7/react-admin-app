import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={css.page}>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
            />
        </div>
    )
}

export {
    NotFoundPage,
}