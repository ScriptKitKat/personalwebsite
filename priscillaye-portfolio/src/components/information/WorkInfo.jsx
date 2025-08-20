import "./MyWork.scss";


const MyWork = () => {
  const projectList = [
    {
      title: "Restoria",
      description:
        "A Video Game about helping the environment by saving birbs",
      logo: "/images/aggienexus.png",
      tech: ["Godot", "Pixel Art", "Shaders"],
      links: [{type: "github", url: "https://github.com/ScriptKitKat/game"},
                {type: "demo", url: "https://scriptkitkat.itch.io/restoria"}
      ],
    },
    {
      title: "CoralGuard",
      description:
        "A web app that helps protect coral reefs with through AI early bleaching dectection",
      logo: "/images/nestrec.png",
      tech: ["Flask", "Python", "Collab", "PyTorch"],
      links: [
        { type: "github", url: "https://github.com/ScriptKitKat/Coral" },
        { type: "demo", url: "https://devpost.com/software/coralguard-52pxvk" },
      ],
    },
    {
      title: "Rapid Removal",
      description:
        "Website for a waste removal company with a modern, sleek style️",
      logo: "/images/spotify.png",
      tech: ["TypeScript", "Next", "Tailwind CSS", "Node.js", "Figma"],
      links: [
        { type: "github", url: "https://github.com/ScriptKitKat/rapid-removal" },
        { type: "website", url: "https://rapid-removal.vercel.app" },
      ],
    },
    {
      title: "Extended Essay",
      description:
        "Essay on the mathematics behind Neural Networks",
      logo: "/images/spotify.png",
      tech: ["Latex", "Python", "Google Collab"],
      links: [
        { type: "essay", url: "https://github.com/ScriptKitKat/Extended-Essay" },
      ],
    },
    {
      title: "CURIEosity",
      description: "Founder of a female-led non-profit that promotes STEM education",
      logo: "/images/spotify.png",
      tech: ["TypeScript", "Next", "Tailwind CSS", "Node.js"],
      links: [
        { type: "website", url: "https://www.curieosity.org/" },
      ],
    },
    {
      title: "Personal Portfolio",
      description: "This project! lollll",
      logo: "/images/spotify.png",
      tech: ["3JS", "Blender", "Vite", "React", "GSAP"],
      links: [
        { type: "website", url: "https://priscillaye.me/" },
      ],
    },
  ];

return (
    <section className="projects-section">
        <h2 className="projects-header">My Work</h2>
        <div className="projects-list">
            {projectList.map((proj, i) => (
                <div key={i} className="project-card">
                    <img src={proj.logo} alt={proj.title} className="project-logo" />
                    <div className="project-info">
                        <h3>{proj.title}</h3>
                        <p>{proj.description}</p>
                        <ul className="project-tech">
                            {proj.tech.map((t, idx) => (
                            <li key={idx}>{t}</li>
                            ))}
                        </ul>
                        <div className="project-links">
                            {proj.links.map((link, j) => (
                                <a
                                    key={j}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`project-link ${link.type}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {link.type === "github" ? "GitHub" : "Website"}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
};

export default MyWork;
