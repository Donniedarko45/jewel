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
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'phone') {
      // Keep only digits, limit length based on Indian phone formats
      const digits = value.replace(/\D/g, '');
      if (digits.startsWith('91')) {
        finalValue = digits.slice(0, 12);
      } else {
        finalValue = digits.slice(0, 10);
      }
    } else if (name === 'pinCode') {
      // Keep only digits, limit to 6 digits
      finalValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'name' || name === 'city' || name === 'state') {
      // Prevent numbers and special characters in text fields
      finalValue = value.replace(/[^a-zA-Z\s]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
    // Clear error dynamically as the user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, phone, address, city, pinCode } = formData;

    // Name check: min 3 chars, letters only
    if (!name.trim()) {
      newErrors.name = 'Full Name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name can only contain alphabetic letters and spaces';
    }

    // Phone check: 10 digit Indian mobile numbers
    const cleanedPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else {
      const isValid = (cleanedPhone.length === 10 && /^[6-9]/.test(cleanedPhone)) || 
                      (cleanedPhone.length === 12 && cleanedPhone.startsWith('91') && /^[6-9]/.test(cleanedPhone.slice(2)));
      if (!isValid) {
        newErrors.phone = 'Enter a valid 10-digit mobile number (e.g., 9876543210)';
      }
    }

    // Address check: min 8 characters
    if (!address.trim()) {
      newErrors.address = 'Shipping Address is required';
    } else if (address.trim().length < 8) {
      newErrors.address = 'Please enter a complete address (minimum 8 characters)';
    }

    // City check: min 3 characters
    if (!city.trim()) {
      newErrors.city = 'City is required';
    } else if (city.trim().length < 3) {
      newErrors.city = 'City must be at least 3 characters';
    }

    // PIN Code check: exactly 6 digits
    if (!pinCode.trim()) {
      newErrors.pinCode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(pinCode.trim())) {
      newErrors.pinCode = 'Enter a valid 6-digit PIN Code (e.g., 110001)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const { name, phone, address, city, state, pinCode } = formData;

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
    setErrors({});
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
            
            <form onSubmit={handleCheckoutSubmit} className="checkout-form" noValidate>
              <div className="form-group">
                <label htmlFor="checkout-name">Full Name *</label>
                <input
                  type="text"
                  id="checkout-name"
                  name="name"
                  className={errors.name ? 'input-has-error' : ''}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                />
                {errors.name && <span className="error-message-label">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-phone">Phone Number *</label>
                <input
                  type="tel"
                  id="checkout-phone"
                  name="phone"
                  className={errors.phone ? 'input-has-error' : ''}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., 9876543210"
                  required
                />
                {errors.phone && <span className="error-message-label">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="checkout-address">Shipping Address *</label>
                <textarea
                  id="checkout-address"
                  name="address"
                  className={errors.address ? 'input-has-error' : ''}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, Building, Apartment, etc."
                  rows="3"
                  required
                />
                {errors.address && <span className="error-message-label">{errors.address}</span>}
              </div>

              <div className="form-row-compact">
                <div className="form-group">
                  <label htmlFor="checkout-city">City *</label>
                  <input
                    type="text"
                    id="checkout-city"
                    name="city"
                    className={errors.city ? 'input-has-error' : ''}
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g., Gurugram"
                    required
                  />
                  {errors.city && <span className="error-message-label">{errors.city}</span>}
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
                    className={errors.pinCode ? 'input-has-error' : ''}
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="e.g., 122001"
                    required
                  />
                  {errors.pinCode && <span className="error-message-label">{errors.pinCode}</span>}
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
