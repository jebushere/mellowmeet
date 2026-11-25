import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  X,
  Menu,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import "./App.css";

// Contact details
const CONTACT_EMAIL = "liftrixsolution@gmail.com";
const CONTACT_PHONE = "+91-9600190120";

// Launch date
const LAUNCH_AT = "2027-02-19T23:59:59+05:30";

// Survey URL
const SURVEY_URL = "https://forms.gle/5wcAeEjSs1J7xpBi7";

// Reusable About Content
function AboutContent() {
  return (
    <div className="about-content">

      <div className="about-copy">

        <div className="section-kicker">
          <i />
          A DIFFERENT PERSPECTIVE
        </div>

        <h2>
          We Are Mellow.
          <br />
          A Different Perspective
          <br />
          on <em>Human Connection.</em>
        </h2>

        <p>
          Mellow is built on a simple belief:
          meaningful connections can make life
          more interesting, more fulfilling,
          and more human.
        </p>

        <p>
          We are creating a fresh digital
          experience that brings people closer
          through a more thoughtful approach
          to social connection.
        </p>

        <p>
          Designed with people at its heart,
          Mellow aims to make discovering
          connections feel comfortable,
          engaging, and meaningful.
        </p>

        <p>
          We are putting the finishing touches
          in place as we prepare to introduce Mellow
          to the world.
        </p>

        <p className="highlight-line">
          Something meaningful is coming.
          Stay connected.
        </p>

      </div>

      {/* Contact Details */}
      <div className="contact-panel">

        <h3>Start a Conversation</h3>

        <a href={`mailto:${CONTACT_EMAIL}`}>
          <Mail />
          <span>{CONTACT_EMAIL}</span>
        </a>

        <a
          href={`tel:${CONTACT_PHONE.replaceAll("-", "")}`}
        >
          <Phone />
          <span>{CONTACT_PHONE}</span>
        </a>

        <h3 className="visit-heading">
          Visit Our Office
        </h3>

        <div className="address">
          <MapPin />
          <span>
            Chennai,
            <br />
            Tamil Nadu,
            <br />
            India
          </span>
        </div>

      </div>

    </div>
  );
}

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const starCanvasRef = useRef(null);

  // Countdown Timer
  useEffect(() => {
    if (!LAUNCH_AT) return;

    const updateTimer = () => {
      const distance =
        new Date(LAUNCH_AT).getTime() - Date.now();

      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(distance / 86400000)
        ).padStart(2, "0"),

        hours: String(
          Math.floor((distance % 86400000) / 3600000)
        ).padStart(2, "0"),

        minutes: String(
          Math.floor((distance % 3600000) / 60000)
        ).padStart(2, "0"),

        seconds: String(
          Math.floor((distance % 60000) / 1000)
        ).padStart(2, "0"),
      });
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animated Network Background
  useEffect(() => {
    const canvas = starCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationFrame;

    const PARTICLE_COUNT = 100;
    const CONNECTION_DISTANCE = 150;
    const PARTICLE_SPEED = 0.8;

    const createParticles = () => {
      particles = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
        }

        for (
          let j = index + 1;
          j < particles.length;
          j++
        ) {
          const other = particles[j];

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < CONNECTION_DISTANCE) {
            const opacity =
              (1 - distance / CONNECTION_DISTANCE) * 0.3;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);

            ctx.strokeStyle =
              `rgba(160, 195, 195, ${opacity})`;

            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(220, 240, 240, ${particle.opacity})`;

        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Close panels
  const closePanels = () => {
    setAboutOpen(false);
    setMenuOpen(false);
  };

  // Open About Overlay
  const openAbout = () => {
    setAboutOpen(true);
    setMenuOpen(false);
  };

  const units = timeLeft || {
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  };

  return (
    <main className="mellow-site">

      {/* Animated Background */}
      <div className="space-bg" aria-hidden="true">

        <canvas
          ref={starCanvasRef}
          className="star-canvas"
        />

        <span className="nebula nebula-one" />
        <span className="nebula nebula-two" />

        <span className="shooting-star shooting-one" />
        <span className="shooting-star shooting-two" />

      </div>

      {/* Header */}
      <header className="topbar">

        <button
          className="more-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <button
          className="more-label"
          onClick={openAbout}
        >
          MORE INFO
        </button>

        <a className="brand" href="#home">

          <img
            src="/mellow_logo.png"
            alt="Mellow logo"
          />

          <span>
            MELLOW
            <small>THE CONNECTING SPACE</small>
          </span>

        </a>

      </header>

      {/* Navigation Menu */}
      {menuOpen && (
        <nav className="menu-popover">

          <button onClick={openAbout}>
            More Info
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);

              document
                .getElementById("countdown")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }}
          >
            Countdown
          </button>

          <a
            href={SURVEY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Survey
          </a>

        </nav>
      )}

      {/* Main Landing Page */}
      <section className="launch-layout" id="home">

        {/* Countdown */}
        <div className="countdown-panel" id="countdown">

          <div className="launch-kicker">
            PREPARING FOR
          </div>

          <h1 className="launch-title">
            LAUNCH
          </h1>

          <div className="timer-grid">

            {[
              [units.days, "DAYS"],
              [units.hours, "HOURS"],
              [units.minutes, "MINUTES"],
              [units.seconds, "SECONDS"],
            ].map(([value, label]) => (

              <div className="timer-box" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>

            ))}

          </div>

          {!LAUNCH_AT && (
            <p className="timer-note">
              Official launch date will be announced soon.
            </p>
          )}

          <div className="launch-glow" />

        </div>

        {/* Welcome Content */}
        <div className="welcome-panel">

          <div className="section-kicker">
            <i />
            WELCOME TO MELLOW
          </div>

          <h2>
            Something New Is
            <br />
            Bringing <em>People Closer.</em>
          </h2>

          <p className="lead">
            A new way to discover meaningful connections
            is on its way.
          </p>

          <p>
            Mellow is a thoughtfully designed social
            connection platform built around people,
            personalities, and the possibilities of
            genuine connection.
          </p>

          <p>
            We believe connecting with someone should
            feel more natural, more meaningful, and
            a little more exciting.
          </p>

          <p>
            Something different is taking shape.
          </p>

          <p className="highlight-line">
            The experience is ready. The next chapter
            begins soon.
          </p>

        </div>

      </section>

      {/* Scrollable About Section */}
      <section className="about-section" id="about">

        <AboutContent />

      </section>

      {/* Survey Button */}
      <a
        className="survey-tab"
        href={SURVEY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open survey"
      >
        SURVEY
      </a>

      {/* Footer */}
      <section className="bottom-bar">

        <span className="bottom-line" />

        <span>
          MELLOW · A LITTLE MORE HUMAN
        </span>

        <span className="bottom-line" />

      </section>

      <footer className="site-footer">

        <span>MELLOW</span>

        <span>
          The Connecting Space. A Little More Human.
        </span>

        <span>
          © 2026 Mellow. All Rights Reserved.
        </span>

      </footer>

      {/* More Info Overlay */}
      {aboutOpen && (

        <div
          className="about-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="About Mellow"
        >

          <button
            className="close-about"
            onClick={closePanels}
          >
            <X size={22} />
            <span>CLOSE</span>
          </button>

          <AboutContent />

          <div className="about-footer">

            <strong>MELLOW</strong>

            <span>
              The Connecting Space. A Little More Human.
            </span>

            <span>
              © 2026 Mellow. All Rights Reserved.
            </span>

          </div>

        </div>

      )}

      {/* Ambient Label */}
      <div className="ambient-label">
        <Sparkles size={14} />
        MEANINGFUL CONNECTIONS
      </div>

    </main>
  );
}

export default App;