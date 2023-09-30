import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card } from 'antd';

import css from './Shop.module.css';
import { ShopService } from '../../services/index.js';

const Shop = () => {
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    console.log(files);

    useEffect(() => {
        ShopService.getById(id).then(({ data }) => setShop(data));
        ShopService.getFiles(id).then(({ data }) => setFiles(data));
    }, [])

    return (
        <Card className={css.card}>
            <h1>{shop?.name}</h1>
            <div style={{width: 300}}>
                <p>ID: {shop?._id}</p>
                <p>Shopify Domain : {shop?.shopifyDomain}</p>
                <p>Pricing Plan: {shop?.pricingPlan}</p>
                <p>Files: ***</p>
            </div>
            <Button onClick={() => navigate('/')}>Back</Button>
        </Card>
    )

}

export {
    Shop
}