import { ShopService } from '../services/index.js';
import { Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const handleEnableClick = (id) => {
    ShopService.enable(id);
};

const handleDisableClick = (id) => {
    ShopService.disable(id);
};

const handleAddSnippets = (id) => {
    ShopService.addSnippets(id);
};


const handleRemoveSnippets = (id) => {
    ShopService.removeSnippets(id);
};

export const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: 'Shopify Domain',
        dataIndex: 'shopifyDomain',
        key: 'shopifyDomain',
    },
    {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Pricing Plan',
        key: 'pricingPlan',
        dataIndex: 'pricingPlan',
    },
    {
        title: 'Snippets',
        key: 'snippetsAdded',
        render: (_, record) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="default" onClick={() => handleRemoveSnippets(record._id)}>
                    Delete
                </Button>
                <Button type="primary" onClick={() => handleAddSnippets(record._id)}>
                    Add
                </Button>
            </div>
        ),
    },
    {
        title: 'Active',
        key: 'isActive',
        dataIndex: 'isActive',
        render: (isActive, record) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
                {isActive ?
                    <div style={{ width: '60%', display: "flex", justifyContent: "space-between" }}>
                        <CheckCircleOutlined />
                        <Button type="default" onClick={() => handleDisableClick(record._id)}>
                            Disable
                        </Button>
                    </div>
                    :
                    <div style={{ width: '60%', display: "flex", justifyContent: "space-between" }}>
                        <CloseCircleOutlined />
                        <Button type="primary" onClick={() => handleEnableClick(record._id)}>
                            Enable
                        </Button>
                    </div>
                }

            </div>
        ),
    },
];
