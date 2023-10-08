import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input, Spin, Tree, Typography } from 'antd';

import css from './ShopSettings.module.css';
import { ShopService } from '../../services/index.js';

const { DirectoryTree } = Tree;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ShopSettings = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState([]);
    const [parent, setParent] = useState('');
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getById(id)
            .then(({ data }) => setShop(data))
            .catch(err => setError(err.response));
        ShopService.getFiles(id).then(({ data }) => {
            data.map((el, firstIndex) => {
                el.key = '0-' + firstIndex;
                if ( el.children.length ) {
                    el.children.map((child, index) => {
                        child.key = '0-' + firstIndex + '-' + index;
                        child.isLeaf = true;
                    })
                }
            })
            setFiles(data)
        });
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
        <div className={css.card}>
            {error &&
                <div className={css.errorContent}>
                    <h1>{error.data}</h1>
                </div>
            }
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
                            <DirectoryTree
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
                        <TextArea
                            rows={16}
                            value={inputValue}
                            disabled={!inputValue}
                            style={{ resize: 'none' }}
                            onChange={handleInputChange}
                        />
                        <div className={css.buttons}>
                            <Button
                                className={css.button}
                                disabled={!inputValue}
                                onClick={Save}
                            >
                                Save
                            </Button>
                            <Button
                                className={css.button}
                                disabled={!inputValue}
                                onClick={Cancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
                :
                !error && <div className={css.loading}>
                    <Spin size="large"/>
                </div>
            }
            <Button
                className={css.button}
                onClick={() => navigate('/')}
            >
                Back
            </Button>
        </div>
    )

}

export {
    ShopSettings
}