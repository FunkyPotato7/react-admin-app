import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Button, Card, Input, Spin, Tree, Typography} from 'antd';

import css from './ShopSettings.module.css';
import { ShopService } from '../../services/index.js';

const { Title, Text } = Typography;

const ShopSettings = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [files, setFiles] = useState([]);
    const [parent, setParent] = useState('');
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            ShopService.getById(id).then(({ data }) => setShop(data));
            ShopService.getFiles(id).then(({ data }) => setFiles(data));
        }, 2000)

    }, [])

    const handleSelect = (selectedKeys, { node }) => {
        if (!node.children) {
            setQuery(`${parent}/${node.name}`)
            ShopService.getFile(id, { key: `${parent}/${node.name}` })
                  .then(({ data }) => setInputValue(data.base64content));
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const Save = () => {
        ShopService.updateFile(id, { key: query }, { base64content: inputValue });
        setInputValue('');
    };

    const Cancel = () => {
        setInputValue('');
    };

    return (
        <Card className={css.card}>
            {shop ?
                <div className={css.content}>
                    <div className={css.info}>
                        <div className={css.title}>
                            <Title>{shop?.name}</Title>
                            <Text>ID: {shop?._id}</Text>
                        </div>
                        <div className={css.body}>
                            <Text>Shopify Domain : {shop?.shopifyDomain}</Text>
                            <Text>Pricing Plan: {shop?.pricingPlan}</Text>
                        </div>
                        <Text>Files:</Text>
                        <div className={css.tree}>
                            <Tree
                                treeData={files}
                                fieldNames={{ title: "name" }}
                                onExpand={(_, { node }) => {
                                    setParent(node.name)
                                }}
                                onSelect={handleSelect}
                            />
                        </div>
                    </div>
                    <div className={css.form}>
                        <Input
                            value={inputValue}
                            disabled={!inputValue}
                            onChange={handleInputChange}
                        />
                        <div className={css.buttons}>
                            <Button
                                onClick={Save}
                                disabled={!inputValue}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={Cancel}
                                disabled={!inputValue}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
                :
                <div className={css.loading}>
                    <Spin/>
                </div>
            }
            <Button onClick={() => navigate('/')}>Back</Button>
        </Card>
    )

}

export {
    ShopSettings
}