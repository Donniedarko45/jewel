import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, city, state, pinCode } = formData;
    if (!name || !phone || !address || !city || !pinCode) {
      alert('Please fill out all required fields');
      return;
    }

    // Format products text
    const itemsText = cartItems.map(item => 
      `• ${item.quantity}x ${item.name} (₹${item.price.toLocaleString('en-IN')} each)`
    ).join('\n');

    // Build message
    const text = `🛍️ *DIVA & Co. - New Order Request*\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${name}\n` +
      `• Contact: ${phone}\n\n` +
      `*Shipping Address:*\n` +
      `${address}, ${city}${state ? `, ${state}` : ''} - ${pinCode}\n\n` +
      `*Items Ordered:*\n` +
      `${itemsText}\n\n` +
      `*Order Total:* ₹${cartTotal.toLocaleString('en-IN')}\n\n` +
      `Please confirm availability and share payment/delivery details!`;

    // Encode text and WhatsApp link (prefixed with country code 91)
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919758096789?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Reset forms and clear cart
    clearCart();
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pinCode: ''
    });
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛒</span>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image ? <img src={item.image} alt={item.name} /> : <div className="cart-no-img">No Image</div>}
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>×</button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button className="btn-checkout" onClick={() => setIsCheckoutOpen(true)}>
                CHECKOUT VIA WHATSAPP 💬
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout Details Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsCheckoutOpen(false)} aria-label="Close modal">×</button>
            <div className="modal-header">
              <h2>Delivery Information</h2>
              <p>Please enter your details to route your order request directly to WhatsApp.</p>
            </div>
            
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="checkout-name">Full Name *</label>
                <input
                  type="text"
                  id="checkout-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="checkout-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., +91 97580 96789"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-address">Shipping Address *</label>
                <textarea
                  id="checkout-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, Building, Apartment, etc."
                  rows="3"
                  required
                />
              </div>

              <div className="form-row-compact">
                <div className="form-group">
                  <label htmlFor="checkout-city">City *</label>
                  <input
                    type="text"
                    id="checkout-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Gurugram"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-state">State</label>
                  <input
                    type="text"
                    id="checkout-state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g., Haryana"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-pin">PIN / Postal Code *</label>
                  <input
                    type="text"
                    id="checkout-pin"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 122001"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setIsCheckoutOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  Place Order via WhatsApp 💬
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
