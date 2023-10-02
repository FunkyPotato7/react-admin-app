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
    const [loading, setLoading] = useState(0);
    const [snippetsLoading, setSnippetsLoading] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getAll().then(({ data }) => setShops(data));
    }, [])

    const handleEnableClick = async (id, event) => {
        event.stopPropagation();
        setLoading(id);
        await ShopService.enable(id)
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setLoading(0);
        }, 1000)

    };

    const handleDisableClick = async (id, event) => {
        event.stopPropagation();
        setLoading(id);
        await ShopService.disable(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setLoading(0);
        }, 1000)
    };

    const handleAddSnippets = (id, event) => {
        event.stopPropagation();
        setSnippetsLoading(id);
        ShopService.addSnippets(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setSnippetsLoading(0);
        }, 1000)
    };


    const handleRemoveSnippets = (id, event) => {
        event.stopPropagation();
        setSnippetsLoading(id);
        ShopService.removeSnippets(id);
        setTimeout(async () => {
            const { data } = await ShopService.getAll();
            setShops(data);
            setSnippetsLoading(0);
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
                <div className={css.snippetButtons}>
                    {record.snippetsAdded && "snippets added" || "no data"}
                        {!record.snippetsAdded ?
                            <Button
                                className={css.button}
                                type="primary"
                                shape="circle"
                                icon={snippetsLoading === record._id && <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />} /> || <PlusOutlined />}
                                onClick={(e) => handleAddSnippets(record._id, e)}
                            />
                            :
                            <Button
                                className={css.button}
                                type="default"
                                shape="circle"
                                icon={snippetsLoading === record._id && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> ||  <DeleteOutlined />}
                                onClick={(e) => handleRemoveSnippets(record._id, e)}
                            />
                        }
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
                                disabled={!record.snippetsAdded || loading === record._id}
                                onClick={(e) => handleDisableClick(record._id, e)}
                            >
                                {loading === record._id && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> || 'Disable'}
                            </Button>
                        </div>
                        :
                        <div style={{ width: '60%', display: "flex", justifyContent: "space-between" }}>
                            <CloseCircleOutlined />
                            <Button
                                style={{ width: '75px' }}
                                type="primary"
                                disabled={!record.snippetsAdded || loading === record._id}
                                onClick={(e) => handleEnableClick(record._id, e)}
                            >
                                {loading === record._id && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> || 'Enable'}
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
                rowKey='_id'
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