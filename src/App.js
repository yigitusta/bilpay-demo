import React from 'react';
import Cart from './containers/Cart';
import ProductList from './containers/ProductList';
import Payment from './containers/Payment/Payment';

const App = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Shopping With Bilcoins DEMO</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <ProductList />
                    </div>
                    <div className="col-md-4">
                        <Cart />
                    </div>
                </div>
            </div>
            <Payment />
        </React.Fragment>
    );
}

export default App;
