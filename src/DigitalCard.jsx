import { useState, useEffect } from "react";
import "./DigitalCard.css";

// ─── Profile Data ───────────────────────────────────────────────
// This is the only section you need to edit to personalise the card.

const profile = {
  name: "Fabunmi Richard",
  handle: "@richyfabz",
  tagline: "Data Engineer · AI Engineer · Smart Contracts · Full-Stack",
  location: "Lagos, NG ",
  bio: "Building at the intersection of data, AI, and decentralised systems. Smart contract dev in Solidity, data pipelines, AI engineering, and full-stack web. Currently shipping a Web3 DevRel Campaigns Platform.",
  stack: ["Solidity", "Python", "Next.js", "Supabase", "wagmi", "SQL", "React"],
  links: [
    { label: "Twitter / X",  href: "https://x.com/damilola356075",                          icon: "𝕏" },
    { label: "LinkedIn",     href: "https://www.linkedin.com/in/fabunmi-richard-a686ab23b/", icon: "in" },
    { label: "GitHub",       href: "https://github.com/richyfabz",                           icon: "gh" },
    { label: "Email",        href: "mailto:dammifabz@gmail.com",                             icon: "@" },
  ],
  statusMessages: [
    "Available for opportunities",
    "Building in public · Web3",
    "Open to collabs & DevRel",
    "Data · AI · Blockchain",
  ],
};


// ─── Hook: Cycle status messages ────────────────────────────────
// Rotates through the statusMessages array on a fixed interval.
// The cleanup function prevents memory leaks on unmount.

function useStatusCycle(messages, delay = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, delay);

    return () => clearInterval(timer);
  }, [messages, delay]);

  return messages[index];
}


// ─── Hook: Typewriter ───────────────────────────────────────────
// Types out `text` one character at a time.
// Resets and restarts whenever `text` changes.

function useTypewriter(text, speed = 40) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput("");
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return output;
}


// ─── Component: Avatar initials ────────────────────────────────
// Renders a stylised monogram circle in place of a photo.

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="avatar">
      <span className="avatar-initials">{initials}</span>
      <div className="avatar-ring" />
    </div>
  );
}


// ─── Component: Social link button ─────────────────────────────

function LinkButton({ label, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-button"
    >
      <span className="link-icon">{icon}</span>
      <span className="link-label">{label}</span>
      <span className="link-arrow">↗</span>
    </a>
  );
}


// ─── Component: Stack badge ─────────────────────────────────────

function Badge({ label }) {
  return <span className="badge">{label}</span>;
}


// ─── Component: Status pill ─────────────────────────────────────
// Shows the current rotating status with a pulsing dot.

function StatusPill({ text }) {
  return (
    <div className="status-pill">
      <span className="status-dot" />
      <span className="status-text">{text}</span>
    </div>
  );
}


// ─── Main Card ──────────────────────────────────────────────────

export default function DigitalCard() {
  const currentStatus = useStatusCycle(profile.statusMessages, 3200);
  const typedStatus   = useTypewriter(currentStatus, 38);
  const [mounted, setMounted]   = useState(false);

  // Trigger entrance animation after first render
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page">

      {/* Geometric mesh background */}
      <div className="bg-mesh" aria-hidden="true">
        <div className="mesh-circle mesh-circle--1" />
        <div className="mesh-circle mesh-circle--2" />
        <div className="mesh-circle mesh-circle--3" />
      </div>

      {/* Card */}
      <div className={`card ${mounted ? "card--visible" : ""}`}>

        {/* Gradient top accent bar */}
        <div className="card-accent" />

        {/* Header: avatar + name block */}
        <header className="card-header">
          <Avatar name={profile.name} />

          <div className="name-block">
            <h1 className="name">{profile.name}</h1>
            <p className="handle">{profile.handle}</p>
          </div>

          <StatusPill text={typedStatus} />
        </header>

        {/* Tagline */}
        <p className="tagline">{profile.tagline}</p>

        <div className="divider" />

        {/* Bio */}
        <p className="bio">{profile.bio}</p>

        {/* Stack */}
        <div className="badges">
          {profile.stack.map(item => (
            <Badge key={item} label={item} />
          ))}
        </div>

        <div className="divider" />

        {/* Links */}
        <nav className="links" aria-label="Social links">
          {profile.links.map(link => (
            <LinkButton key={link.label} {...link} />
          ))}
        </nav>

        {/* Footer */}
        <footer className="card-footer">
          <span>{profile.location}</span>
          <span>richyfabz · 2025</span>
        </footer>

      </div>
    </div>
  );
}