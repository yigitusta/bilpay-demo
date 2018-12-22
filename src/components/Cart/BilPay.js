import React, { Component } from 'react';
import { QRCode } from 'react-qr-svg';
window.url = "https://stellar.altugankarali.com/api/merchant/authorize";

class BilPay extends Component {
  componentDidMount() {
    this.sendAuthorizationRequest();
  }
  componentWillUnmount() {
    this.interval && clearInterval(this.interval) && console.log("removed interval");
  }
  state = {
    status: "loading",
    url: window.url,
    transactionID: null,
    publicKey: null,
    amount: null
  }

  renderQRCode() {
    return (
      <QRCode
        level="Q"
        style={{ width: 256 }}
        value={JSON.stringify({
          publicKey: this.state.publicKey,
          amount: this.state.amount,
          transactionID: this.state.transactionID,
          additionalInfo: this.props.additionalInfo
        })}
      />
    );
  }

  sendAuthorizationRequest() {
    fetch(this.state.url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_public_key: this.props.publicKey,
        shop_name: this.props.shopName,
        additional_info: this.props.additionalInfo,
        amount: this.props.amount
      })
    })
    .then(response => response.json())
    .then(result => {
      if (!!result.id) { // successfull
        this.setState({
          status: "authorized",
          transactionID: result.id,
          publicKey: result.merchant_public_key,
          shopName: result.shop_name,
          amount: result.amount,
          additionalInfo: result.additional_info
        });
        this.pollTransactionStatus();
      } else { // error
        this.setState({ status: "authorizationError" });
      }
    });
  }

  pollTransactionStatus() {
    this.interval = setInterval(function() {
      fetch(this.state.url + `/${this.state.transactionID}`, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === "received") {
          this.setState({ status: "success" });
          clearInterval(this.interval);
        }
      });
    }.bind(this), 1000);
  }

  renderSuccess() {
    return (
      <div>
        <h2>PAYMENT SUCCESSFULL</h2>
        <img src="images/success.png" alt="Success" style={{width: "30%"}}/>
      </div>
    );
  }

  render() {
    switch (this.state.status) {
      case "loading":
      default:
        return <div>LOADING...</div>;
      case "authorizationError":
        return <div>Authorization Error...</div>;
      case "authorized":
        return this.renderQRCode();
      case "success":
        return this.renderSuccess();
    }
  }
}

export default BilPay;