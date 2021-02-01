import React, { Component } from "react";
import formatCurrency from "../utils";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      address: "",
      showCheckout: false}
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is Empty</div>
          ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{" "}
            </div>
          )}
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count} &nbsp;
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length > 0 && (
            <div>
            <div className="cart">
            <div className="total">
              <div>
              Total:&nbsp;
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <div>
                <button onClick={() => {this.setState({showCheckout: true}); }} className="btn-primary">Proceed</button>
              </div>
            </div>
          </div>
          {this.state.showCheckout && (
            <div className="cart">
              <form onSubmit={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>Email</label>
                    <input name="email" onChange={this.handleInput} type="emmail" required />
                  </li>
                  <li>
                    <label>Name</label>
                    <input name="name" onChange={this.handleInput} type="text" required />
                  </li>
                  <li>
                    <label>Address</label>
                    <input name="address" onChange={this.handleInput} type="text" required />
                  </li>
                  <li>
                    <button type="submit" className="btn-primary">Checkout</button>
                  </li>
                </ul>
              </form>
            </div>
          )}
          </div>
          )}
        </div>
      </>
    );
  }
}
