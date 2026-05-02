import './FeaturesSection.css';
import shippingIcon from '../assets/shipping.png';
import exclusiveIcon from '../assets/exclusive.png';
import packingIcon from '../assets/packing.png';
import qualityIcon from '../assets/quality.png';

const FeaturesSection = () => {
    const features = [
        {
            icon: shippingIcon,
            title: "Free Shipping",
            description: "Enjoy fast & free delivery on all your favorite pieces—because luxury should be effortless."
        },
        {
            icon: exclusiveIcon,
            title: "Exclusive Designs",
            description: "Discover jewelry you won't find anywhere else—crafted to make you feel one of a kind."
        },
        {
            icon: packingIcon,
            title: "Premium Packaging",
            description: "Every order arrives in elegant, secure packaging—perfect for gifting or treating yourself."
        },
        {
            icon: qualityIcon,
            title: "Long-Lasting Quality",
            description: "Anti-tarnish, skin-friendly, and made to shine—quality you can trust every day."
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <div className="feature-icon">
                            <img src={feature.icon} alt={feature.title} />
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
