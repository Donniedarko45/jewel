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
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: exclusiveIcon,
            title: "Exclusive Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: packingIcon,
            title: "Good Packaging",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: qualityIcon,
            title: "Highest Quality",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
