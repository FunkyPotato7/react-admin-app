import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Spin } from 'antd';

export const AuthenticationGuard = ({ component }) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div style={{ width: '100%', height: '800px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Spin size='large'/>
            </div>
        ),
    });

    return <Component/>;
};