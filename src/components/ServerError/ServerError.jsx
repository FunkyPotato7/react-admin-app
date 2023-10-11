import { Button, Result } from 'antd';

import css from './ServerError.module.css';

const ServerError = () => {
    const handleReloadClick = () => {
        window.location.reload();
    };

    return (
        <div className={css.page}>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" onClick={handleReloadClick}>Try again</Button>}
            />
        </div>
    )
}

export {
    ServerError
}