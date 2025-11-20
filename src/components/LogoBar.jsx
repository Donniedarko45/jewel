import './LogoBar.css';

const LogoBar = () => {
    const logos = [
        "logoipsum",
        "logoipsum",
        "logoipsum",
        "logoipsum",
        "logoipsum"
    ];

    return (
        <div className="logo-bar">
            <div className="logo-container">
                {logos.map((logo, index) => (
                    <div key={index} className="logo-item">
                        <span className="logo-icon">❖</span>
                        <span className="logo-text">{logo}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoBar;
