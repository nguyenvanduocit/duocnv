#!/usr/bin/env bun

import { useState, useRef, useEffect } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import SelectInput from "ink-select-input";
import gradient from "gradient-string";
import figlet from "figlet";
import { spawn } from "child_process";
import { platform } from "os";

const coolGradient = gradient(["#00d4ff", "#7c3aed", "#f472b6"]);
const PROFILE_URL =
  "https://raw.githubusercontent.com/nguyenvanduocit/nguyenvanduocit/master/profile.json";

// Default fallback data
const defaultProfile = {
  name: "Duoc Nguyen",
  tagline: "Pi-shaped engineer: Backend/AI tooling × AI agents/MCP × Product iteration",
  stats: { years: 13, commits: "5K+", repos: 425, stars: "1.8K" },
  bio: [
    "I like building small tools that solve my own problems.",
    "Currently tinkering with Clik (screenshot tool) and Just Read.",
    "",
    "Day job: Engineering Manager, helping teams ship good software.",
    "Side quests: Open source, writing, and learning new things.",
    "",
    "All my side projects live at aiocean.io",
    "I write at 12bit.vn (Vietnamese) and onepercent.plus (English)",
    "",
    "Helped start Vue.js Vietnam community back in 2016.",
    "Still believe in sharing knowledge and helping others grow.",
  ],
  projects: [
    {
      id: "jira-mcp",
      title: "Jira MCP",
      description: "AI-Jira bridge for Claude",
      tech: "Go",
      url: "https://github.com/nguyenvanduocit/jira-mcp",
      stars: 79,
    },
    {
      id: "obsidian-open-gate",
      title: "Obsidian Open Gate",
      description: "Embed webpages in Obsidian",
      tech: "TypeScript",
      url: "https://github.com/nguyenvanduocit/obsidian-open-gate",
      stars: 219,
    },
    {
      id: "duocnv",
      title: "duocnv",
      description: "This terminal card",
      tech: "TypeScript",
      url: "https://github.com/nguyenvanduocit/duocnv",
    },
  ],
  now: ["Building Claude plugin ecosystem", "Shipping interactive dev tools"],
  links: {
    github: "https://github.com/nguyenvanduocit",
    twitter: "https://x.com/duocdev",
    linkedin: "https://linkedin.com/in/duocnv",
    blog: "https://12bit.vn",
    website: "https://onepercent.plus",
  },
};

// Terminal hyperlink (OSC 8)
const link = (url, text) => `\x1b]8;;${url}\x07${text}\x1b]8;;\x07`;

// Open URL in browser
const openBrowser = (url) => {
  const cmd = platform() === "darwin" ? "open" : platform() === "win32" ? "cmd" : "xdg-open";
  const args = platform() === "win32" ? ["/c", "start", url] : [url];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
};

// Konami code
const KONAMI = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];

function useKonamiCode(onActivate) {
  const sequence = useRef([]);
  useInput((input, key) => {
    let pressed = null;
    if (key.upArrow) pressed = "up";
    else if (key.downArrow) pressed = "down";
    else if (key.leftArrow) pressed = "left";
    else if (key.rightArrow) pressed = "right";
    else if (input === "b") pressed = "b";
    else if (input === "a") pressed = "a";
    if (pressed) {
      sequence.current.push(pressed);
      if (sequence.current.length > KONAMI.length) sequence.current.shift();
      if (sequence.current.join(",") === KONAMI.join(",")) {
        sequence.current = [];
        onActivate();
      }
    }
  });
}

function Header({ profile }) {
  const logoText = figlet.textSync("DUOC  NV", { font: "ANSI Shadow", horizontalLayout: "fitted" });
  const { stats, links, bio } = profile;

  return (
    <Box flexDirection="column">
      <Text> </Text>
      <Text>{coolGradient(logoText)}</Text>
      <Text dimColor> From Vietnam</Text>
      <Text> </Text>
      <Text>
        {"  "}
        <Text color="cyan" bold>
          {stats.years}+
        </Text>{" "}
        <Text dimColor>years coding</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          {stats.commits}
        </Text>{" "}
        <Text dimColor>commits</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          {stats.repos}
        </Text>{" "}
        <Text dimColor>repositories</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          {stats.stars}
        </Text>{" "}
        <Text dimColor>GitHub stars</Text>
      </Text>
      <Text> </Text>
      <Text dimColor italic>
        {" "}
        "Leave the world better than we found it"
      </Text>
      <Text> </Text>
      <Text dimColor> ─────────────────────────────────────────────────────────────────</Text>
      <Text> </Text>
      <Text>
        {" "}
        <Text bold>Hi, I'm {profile.name}</Text>{" "}
        <Text dimColor>- Engineering Manager • Curious Mind</Text>
      </Text>
      <Text> </Text>
      {bio &&
        bio.map((line, i) => (
          <Text key={`bio-${i}`} dimColor>
            {" "}
            {line}
          </Text>
        ))}
      <Text> </Text>
      <Text>
        {" "}
        <Text color="cyan">→</Text> <Text dimColor>GitHub:</Text>{" "}
        <Text color="cyan">{link(links.github, "@nguyenvanduocit")}</Text>
      </Text>
      <Text>
        {" "}
        <Text color="cyan">→</Text> <Text dimColor>Twitter:</Text>{" "}
        <Text color="cyan">{link(links.twitter, "@duocdev")}</Text>
      </Text>
      <Text> </Text>
    </Box>
  );
}

function HintBar({ hints }) {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text dimColor> {hints}</Text>
      <Text> </Text>
    </Box>
  );
}

function EasterEgg({ onClose }) {
  useInput((_, key) => {
    if (key.escape || key.return) onClose();
  });
  const art = `
    ╔══════════════════════════════════════════╗
    ║   🎮  KONAMI CODE ACTIVATED!  🎮         ║
    ║                                          ║
    ║   Fun fact: I've been coding since       ║
    ║   2011 and still use "console.log"       ║
    ║   for debugging. 😄                      ║
    ║                                          ║
    ║   Thanks for exploring my card!          ║
    ╚══════════════════════════════════════════╝
  `;
  return (
    <Box flexDirection="column" marginLeft={2}>
      <Text color="magenta">{art}</Text>
      <HintBar hints="Press any key to continue" />
    </Box>
  );
}

function ProjectDetail({ project, onBack }) {
  useInput((_, key) => {
    if (key.escape) onBack();
    if (key.return) openBrowser(project.url);
  });

  return (
    <Box flexDirection="column" marginLeft={2}>
      <Text> </Text>
      <Text color="cyan" bold>
        {project.title}
      </Text>
      <Text> </Text>
      <Text>
        {" "}
        • <Text color="yellow">{project.description}</Text>
      </Text>
      {project.stars && (
        <Text>
          {" "}
          • <Text color="yellow">{project.stars} stars</Text>
        </Text>
      )}
      <Text> </Text>
      <Text dimColor> {project.tech}</Text>
      <Text> </Text>
      <Text>
        {" "}
        <Text color="cyan">{link(project.url, project.url)}</Text>
      </Text>
      <HintBar hints="Enter to open in browser · Esc to back" />
    </Box>
  );
}

function LinkDetail({ url, onBack }) {
  useState(() => openBrowser(url));
  useInput((_, key) => {
    if (key.escape) onBack();
  });
  return (
    <Box flexDirection="column" marginLeft={2}>
      <Text> </Text>
      <Text color="green">✓ Opened in browser!</Text>
      <Text> </Text>
      <Text color="cyan">{link(url, url)}</Text>
      <HintBar hints="Esc to back" />
    </Box>
  );
}

function MainMenu({ onSelect, onEasterEgg }) {
  const items = [
    { label: "View projects", value: "projects", hint: "Things I've built" },
    { label: "Connect with me", value: "connect", hint: "Social links" },
  ];
  const { exit } = useApp();
  useKonamiCode(onEasterEgg);
  useInput((_, key) => {
    if (key.escape) exit();
  });

  return (
    <Box flexDirection="column">
      <SelectInput
        items={items}
        onSelect={(item) => onSelect(item.value)}
        itemComponent={({ isSelected, label, hint }) => (
          <Text>
            <Text color={isSelected ? "cyan" : undefined}>{label}</Text>
            {hint && <Text dimColor> · {hint}</Text>}
          </Text>
        )}
      />
      <HintBar hints="↑/↓ to select · Enter to confirm · Esc to exit" />
    </Box>
  );
}

function ProjectsMenu({ projects, onSelect, onBack }) {
  const items = projects.map((p) => ({
    label: p.title,
    value: p.id,
    hint: p.description,
  }));

  useInput((_, key) => {
    if (key.escape) onBack();
  });

  return (
    <Box flexDirection="column">
      <Text dimColor> Projects</Text>
      <Text> </Text>
      <SelectInput
        items={items}
        onSelect={(item) => onSelect(item.value)}
        itemComponent={({ isSelected, label, hint }) => (
          <Text>
            <Text color={isSelected ? "cyan" : undefined}>{label}</Text>
            {hint && <Text dimColor> · {hint}</Text>}
          </Text>
        )}
      />
      <HintBar hints="↑/↓ to select · Enter to confirm · Esc to back" />
    </Box>
  );
}

function ConnectMenu({ links, onSelect, onBack }) {
  const items = [
    { label: "GitHub", value: "github", hint: "@nguyenvanduocit" },
    { label: "X (Twitter)", value: "twitter", hint: "@duocdev" },
    { label: "LinkedIn", value: "linkedin", hint: "/in/duocnv" },
    { label: "Blog", value: "blog", hint: "12bit.vn" },
    { label: "Website", value: "website", hint: "onepercent.plus" },
  ];

  useInput((_, key) => {
    if (key.escape) onBack();
  });

  return (
    <Box flexDirection="column">
      <Text dimColor> Connect</Text>
      <Text> </Text>
      <SelectInput
        items={items}
        onSelect={(item) => onSelect(links[item.value])}
        itemComponent={({ isSelected, label, hint }) => (
          <Text>
            <Text color={isSelected ? "cyan" : undefined}>{label}</Text>
            {hint && <Text dimColor> · {hint}</Text>}
          </Text>
        )}
      />
      <HintBar hints="↑/↓ to select · Enter to open in browser · Esc to back" />
    </Box>
  );
}

function Loading() {
  return (
    <Box flexDirection="column" padding={2}>
      <Text color="cyan">Loading profile...</Text>
    </Box>
  );
}

function App() {
  const [profile, setProfile] = useState(null);
  const [screen, setScreen] = useState("main");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    fetch(PROFILE_URL)
      .then((r) => r.json())
      .then((data) => setProfile(data))
      .catch(() => setProfile(defaultProfile));
  }, []);

  if (!profile) return <Loading />;

  const handleProjectSelect = (id) => {
    const project = profile.projects.find((p) => p.id === id);
    setSelectedProject(project);
    setScreen("project-detail");
  };

  const handleConnectSelect = (url) => {
    setSelectedLink(url);
    setScreen("connect-detail");
  };

  const goToMain = () => setScreen("main");
  const goToProjects = () => setScreen("projects");
  const goToConnect = () => setScreen("connect");

  if (showEasterEgg) {
    return (
      <Box flexDirection="column">
        <Header profile={profile} />
        <EasterEgg onClose={() => setShowEasterEgg(false)} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Header profile={profile} />
      {screen === "main" && (
        <MainMenu onSelect={setScreen} onEasterEgg={() => setShowEasterEgg(true)} />
      )}
      {screen === "projects" && (
        <ProjectsMenu
          projects={profile.projects}
          onSelect={handleProjectSelect}
          onBack={goToMain}
        />
      )}
      {screen === "connect" && (
        <ConnectMenu links={profile.links} onSelect={handleConnectSelect} onBack={goToMain} />
      )}
      {screen === "project-detail" && (
        <ProjectDetail project={selectedProject} onBack={goToProjects} />
      )}
      {screen === "connect-detail" && <LinkDetail url={selectedLink} onBack={goToConnect} />}
    </Box>
  );
}

render(<App />);
