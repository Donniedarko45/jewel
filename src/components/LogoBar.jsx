import './LogoBar.css';

const LogoBar = () => {
    const logos = [
        { icon: "✦", text: "logoipsum", variant: "variant-1" },
        { icon: "◉", text: "logoipsum", variant: "variant-2" },
        { icon: "◆", text: "logoipsum", variant: "variant-3" },
        { icon: "⊚", text: "logoipsum", variant: "variant-4" },
        { icon: "◉", text: "Logoipsum", variant: "variant-5" }
    ];

    return (
        <div className="logo-bar">
            <div className="logo-container">
                {logos.map((logo, index) => (
                    <div key={index} className={`logo-item ${logo.variant}`}>
                        <span className="logo-icon">{logo.icon}</span>
                        <span className="logo-text">{logo.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoBar;
