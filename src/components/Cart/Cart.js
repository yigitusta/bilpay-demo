import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';

class Cart extends Component {
    state = {
        showModal: false
    }
    render() {
        const { items, total, currency, removeFromCart } = this.props;
        return (
            <div>
                <h3>Shopping Cart</h3>

                <div className="cart">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            {items.length > 0 && (
                                <div className="cart__body">
                                    {items.map(item => (
                                        <CartItem key={item.id} {...item} onClick={() => removeFromCart(item.id)} />
                                    ))}
                                </div>
                            )}
                            {items.length === 0 && (
                                <div className="alert alert-info">Cart is empty</div>
                            )}
                            <div className="cart__total">Total: {total} {currency}</div>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={() => this.props.openPayment()}>Pay With BilCoins</button>
                </div>
            </div>
        );
    }
}

Cart.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    currency: PropTypes.string,
    removeFromCart: PropTypes.func.isRequired
}

export default Cart;
// amount,