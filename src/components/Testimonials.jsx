import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Verified Buyer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      rating: 5,
      text: 'Absolutely stunning craftsmanship! The diamond ring exceeded all my expectations. The attention to detail is remarkable.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Verified Buyer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      rating: 5,
      text: 'Purchased a necklace for my wife and she absolutely loves it. The quality is exceptional and the packaging was beautiful.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Verified Buyer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      rating: 5,
      text: 'Best jewelry shopping experience ever! The customer service was outstanding and the product quality is unmatched.'
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">What Our Clients Say</h2>
        <p className="testimonials-subtitle">Trusted by thousands of satisfied customers</p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
