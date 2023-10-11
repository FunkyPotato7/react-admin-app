import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { message, Button, Spin, Table} from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';

import css from './Shops.module.css';
import { ShopService } from '../../services';
import { ServerError } from '../ServerError/ServerError.jsx';
import { ForbiddenError } from '../ForbiddenError/ForbiddenError.jsx';

const Shops = () => {
    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState('');
    const [snippetsLoading, setSnippetsLoading] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        ShopService.getAll()
            .then(({ data }) => setShops(data))
            .catch((e) => {
                setError(e);
            })
    }, [])

    if (error?.response.status === 500) {
        return <ServerError/>
    } else if (error?.response.status === 403) {
        return <ForbiddenError/>
    }

    const handleEnableClick = async (id, event) => {
        try {
            event.stopPropagation();
            setLoading(id);
            await ShopService.enable(id)
            setTimeout(async () => {
                const { data } = await ShopService.getAll();
                setShops(data);
                setLoading('');
            }, 1000)
        } catch (e) {
            setLoading('');
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
    };

    const handleDisableClick = async (id, event) => {
        try {
            event.stopPropagation();
            setLoading(id);
            await ShopService.disable(id);
            setTimeout(async () => {
                const { data } = await ShopService.getAll();
                setShops(data);
                setLoading('');
            }, 1000)
        } catch (e) {
            setLoading('');
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
    };

    const handleAddSnippets = async (id, event) => {
        try {
            event.stopPropagation();
            setSnippetsLoading(id);
            await ShopService.addSnippets(id);
            setTimeout(async () => {
                const { data } = await ShopService.getAll();
                setShops(data);
                setSnippetsLoading('');
            }, 1000)
        } catch (e) {
            setSnippetsLoading('');
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
    };


    const handleRemoveSnippets = async (id, event) => {
        try {
            event.stopPropagation();
            setSnippetsLoading(id);
            await ShopService.removeSnippets(id);
            setTimeout(async () => {
                const { data } = await ShopService.getAll();
                setShops(data);
                setSnippetsLoading(0);
            }, 1000)
        } catch (e) {
            setSnippetsLoading('');
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
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
            render: (_, record) => (
                <Link to={`/shop/${record._id}`}>
                    {record.name}
                </Link>
            ),

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
            {!shops.length &&
                <div className={css.spinnerBox}>
                    <Spin className={css.spin} size="large"/>
                </div>
            }
            {shops.length &&
                <Table
                    sticky={true}
                    rowKey='_id'
                    columns={columns}
                    dataSource={shops}
                    pagination={false}
                />
            }
            {contextHolder}
        </div>
    )
}

export {
    Shops,
}