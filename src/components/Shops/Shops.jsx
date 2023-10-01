import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin, Table } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';

import css from './Shops.module.css';
import { ShopService } from '../../services';

const Shops = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getAll().then(({ data }) => setShops(data));
    }, [])

    const handleEnableClick = async (id, event) => {
        event.stopPropagation();
        setLoading(true);
        await ShopService.enable(id)
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setLoading(false);
        }, 1000)

    };

    const handleDisableClick = async (id, event) => {
        event.stopPropagation();
        setLoading(true);
        await ShopService.disable(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setLoading(false);
        }, 1000)
    };

    const handleAddSnippets = (id, event) => {
        event.stopPropagation();
        ShopService.addSnippets(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
        }, 1000)
    };


    const handleRemoveSnippets = (id, event) => {
        event.stopPropagation();
        ShopService.removeSnippets(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
        }, 1000)
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Shopify Domain',
            dataIndex: 'shopifyDomain',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Pricing Plan',
            dataIndex: 'pricingPlan',
        },
        {
            title: 'Snippets',
            dataIndex: 'snippetsAdded',
            render: (_, record) => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {record.snippetsAdded && "snippetsAdded" || "no data"}
                    <div style={{ width: '75px', display: "flex", justifyContent: "space-between" }}>
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={(e) => handleAddSnippets(record._id, e)}
                        />
                        <Button
                            type="default"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={(e) => handleRemoveSnippets(record._id, e)}
                        />
                    </div>
                </div>
            ),
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            render: (isActive, record) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {isActive ?
                        <div style={{ width: '60%', display: "flex", justifyContent: "space-between" }}>
                            <CheckCircleOutlined />
                            <Button
                                style={{ width: '75px' }}
                                type="default"
                                disabled={!record.snippetsAdded || loading}
                                onClick={(e) => handleDisableClick(record._id, e)}
                            >
                                {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> || 'Disable'}
                            </Button>
                        </div>
                        :
                        <div style={{ width: '60%', display: "flex", justifyContent: "space-between" }}>
                            <CloseCircleOutlined />
                            <Button
                                style={{ width: '75px' }}
                                type="primary"
                                disabled={!record.snippetsAdded || loading}
                                onClick={(e) => handleEnableClick(record._id, e)}
                            >
                                {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> || 'Enable'}
                            </Button>
                        </div>
                    }

                </div>
            ),
        },
    ];

    return (
        <div className={css.main}>
            <Table
                sticky={true}
                columns={columns}
                dataSource={shops}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => navigate(`/shop/${record._id}`)
                })}
            />
        </div>
    )
}

export {
    Shops,
}