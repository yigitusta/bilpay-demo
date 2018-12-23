import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { Modal, Content } from 'micro-modal';
import BilPay from './BilPay';

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
                    <button className="btn btn-success" onClick={() => this.setState({showModal: true})}>Pay With BilCoins</button>
                    <Modal
                        className="modal"
                        style={{ background: 'rgba(0,0,0,0.8)' }}
                        open={this.state.showModal}
                        openClass="is-open"
                        visibleClass="is-visible"
                        hidingClass="is-hiding"
                        closeTimeout={500}
                        bodyClass="modal-is-visible"
                        onClose={nill => console.log('Closing')}
                        onOpen={nill => console.log('Opening')}
                        onClick={e => this.toggle(!this.state.open)}
                        overlayClassName="modal__overlay"
                        overlayStyle={{ background: 'rgba(0,0,0,0.4)' }}
                        portalClassName="modal-portal"
                        portalStyle={{ position: 'relative' }}>
                        <Content
                            onClick={nill => console.log('Clicked on content')}
                            style={{ background: 'white' }}
                            className="modal__content">
                            <h1><button onClick={() => this.setState({ showModal: false })}className="btn btn-danger" style={{marginRight: '20px'}}>X</button>Pay With Bilcoins</h1>
                            <div style={{
                                textAlign: 'center',
                                marginTop: '50px'
                            }}>
                                {this.state.showModal &&
                                    <BilPay
                                        shopName="BilPay DEMO Shop"
                                        publicKey="GDFPHZTO4YHRC6KE7X7SBBGVBY4V7ZPVAZLVR7LBEKNKJBQJY3KHOXWM"
                                        amount={total}
                                        additionalInfo= {{ merchantOrderID: String(parseInt(Math.random() * 100000)) }}
                                    />
                                }
                            </div>
                        </Content>
                    </Modal>
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