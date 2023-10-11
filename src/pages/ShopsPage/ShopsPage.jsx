import { Header, Shops } from '../../components/index.js';

const ShopsPage = ({ user }) => {
    return (
        <div>
            <Header user={user}/>
            <Shops/>
        </div>
    )
}

export {
    ShopsPage
}