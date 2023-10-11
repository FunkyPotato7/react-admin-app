import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Button, Input, Result, Spin, Tree, Typography } from 'antd';

import css from './ShopSettings.module.css';
import { ShopService } from '../../services/index.js';
import { ServerError } from '../ServerError/ServerError.jsx';
import { ForbiddenError } from '../ForbiddenError/ForbiddenError.jsx';

const { DirectoryTree } = Tree;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ShopSettings = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [error, setError] = useState(null);
    const [filesError, setFilesError] = useState(null);
    const [files, setFiles] = useState([]);
    const [parent, setParent] = useState('');
    const [query, setQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        ShopService.getById(id)
            .then(({ data }) => setShop(data))
            .catch(err => setError(err));
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
        }).catch((e) => {
            setFilesError(e);
        });
    }, [])

    const handleSelect = async (selectedKeys, { node }) => {
        try {
            if (!node.children) {
                setQuery(`${parent}/${node.name}`);
                const { data  } = await ShopService.getFile(id, { key: `${parent}/${node.name}` })
                setInputValue(data.base64content);
            }
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const Save = async () => {
        try {
            await ShopService.updateFile(id, { key: query }, { base64content: inputValue });
            setInputValue('');
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: `${e.response.status} ${e.response.data}`,
            });
        }
    };

    const Cancel = () => {
        setInputValue('');
    };

    return (
        <div className={css.card}>
            {error?.response.status === 500 &&
                <ServerError/>
            }
            {error?.response.status === 404 &&
                <Result
                    className={css.errorResult}
                    status="warning"
                    title="404"
                    subTitle={error.response.data}
                />
            }
            {error?.response.status === 403 &&
                <ForbiddenError/>
            }
            {shop && !error ?
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
                            {!filesError ? <DirectoryTree
                                treeData={files}
                                fieldNames={{title: "name"}}
                                onExpand={(_, {node}) => {
                                    setParent(node.name)
                                }}
                                onSelect={handleSelect}
                            />
                            :
                            <Text>Permission denied to read files</Text>
                            }
                        </div>
                    </div>
                    <div className={css.form}>
                        <TextArea
                            rows={30}
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
            {contextHolder}
        </div>
    )

}

export {
    ShopSettings,
}