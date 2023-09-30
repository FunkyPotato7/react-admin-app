import { useEffect, useState } from 'react';
import { Table } from 'antd';

import css from './ShopList.module.css';
import { columns } from '../../configs/columns.jsx';
import { ShopService } from '../../services/index.js';
import {useNavigate} from "react-router-dom";

const ShopList = () => {
    const [shops, setShops] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getAll().then(({data}) => {
            setShops(data);
        });
    }, [])

    return (
        <div className={css.main}>
            <Table
                className={css.table}
                columns={columns}
                dataSource={shops}
                pagination={false}
            />
        </div>
    )
}

export {
    ShopList,
}