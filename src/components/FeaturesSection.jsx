import './FeaturesSection.css';

const FeaturesSection = () => {
    const features = [
        {
            icon: "🕒",
            title: "Free Shipping",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: "💎",
            title: "Exclusive Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: "🎁",
            title: "Good Packaging",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            icon: "⭐",
            title: "Highest Quality",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
