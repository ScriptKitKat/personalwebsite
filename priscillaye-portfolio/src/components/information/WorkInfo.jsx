import "./MyWork.scss";


const MyWork = () => {
  const projectList = [
    {
      title: "Aggie Nexus (Coming Soon)",
      description:
        "Online platform that connects students, alumni, and faculty to collaborate on entrepreneurial projects, share ideas, and access mentorship and funding.",
      logo: "/images/aggienexus.png",
      links: [],
    },
    {
      title: "nest.rec",
      description:
        "A security app that uses AI to recognize and log detected human figures. Compatible with Google Nest®.",
      logo: "/images/nestrec.png",
      links: [
        { type: "github", url: "https://github.com/your-repo" },
      ],
    },
    {
      title: "basic.ify",
      description:
        "A web app that allows Spotify users to see how unique their music taste is.",
      logo: "/images/spotify.png",
      links: [
        { type: "github", url: "https://github.com/your-repo" },
        { type: "website", url: "https://basicify.vercel.app" },
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
