#!/usr/bin/env bun

import { useState, useRef } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import SelectInput from "ink-select-input";
import gradient from "gradient-string";
import figlet from "figlet";
import { spawn } from "child_process";
import { platform } from "os";

const coolGradient = gradient(["#00d4ff", "#7c3aed", "#f472b6"]);

// Terminal hyperlink (OSC 8)
const link = (url, text) => `\x1b]8;;${url}\x07${text}\x1b]8;;\x07`;

// Open URL in browser safely using spawn
const openBrowser = (url) => {
  const cmd = platform() === "darwin" ? "open" : platform() === "win32" ? "cmd" : "xdg-open";
  const args = platform() === "win32" ? ["/c", "start", url] : [url];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
};

// Konami code sequence
const KONAMI = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];

const links = {
  github: "https://github.com/nguyenvanduocit",
  twitter: "https://x.com/duocdev",
  linkedin: "https://linkedin.com/in/duocnv",
  blog: "https://12bit.vn",
  website: "https://onepercent.plus",
};

const projectDetails = {
  clik: {
    title: "Clik - Screenshot Tool",
    stats: [
      "Annotate screenshots for AI prompts",
      "Counter markers for referencing",
      "Keyboard-first workflow",
    ],
    tech: "Tauri + Rust + React",
    url: "https://clik.aiocean.io",
  },
  justread: {
    title: "Just Read - Reading Helper",
    stats: ["Translation for English learners", "EPUB/PDF support", "Built for my own learning"],
    tech: "TypeScript",
    url: "https://aiocean.io",
  },
  obsidian: {
    title: "Obsidian Open Gate",
    stats: ["Embed webpages in Obsidian", "Simple plugin I made", "Open source"],
    tech: "TypeScript, Obsidian API",
    url: "https://github.com/nguyenvanduocit/obsidian-open-gate",
  },
};

// Konami code hook
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
      if (sequence.current.length > KONAMI.length) {
        sequence.current.shift();
      }
      if (sequence.current.join(",") === KONAMI.join(",")) {
        sequence.current = [];
        onActivate();
      }
    }
  });
}

function Header() {
  const logoText = figlet.textSync("DUOC  NV", { font: "ANSI Shadow", horizontalLayout: "fitted" });

  return (
    <Box flexDirection="column">
      <Text> </Text>
      <Text>{coolGradient(logoText)}</Text>
      <Text dimColor> Engineering Manager • Curious Mind</Text>
      <Text> </Text>
      <Text>
        {"  "}
        <Text color="cyan" bold>
          13+
        </Text>{" "}
        <Text dimColor>years coding</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          5K+
        </Text>{" "}
        <Text dimColor>commits</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          425
        </Text>{" "}
        <Text dimColor>repositories</Text>
        <Text dimColor> • </Text>
        <Text color="cyan" bold>
          1.8K
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
        <Text bold>Hi, I'm Được Nguyễn</Text>{" "}
        <Text dimColor>- a curious developer from Vietnam</Text>
      </Text>
      <Text> </Text>
      <Text dimColor> I like building small tools that solve my own problems.</Text>
      <Text dimColor> Currently tinkering with Clik (screenshot tool) and Just Read</Text>
      <Text dimColor> (reading helper) in my spare time.</Text>
      <Text> </Text>
      <Text dimColor> Day job: Engineering Manager, helping teams ship good software.</Text>
      <Text dimColor> Side quests: Open source, writing at 12bit.vn, and learning new things.</Text>
      <Text> </Text>
      <Text dimColor> Helped start Vue.js Vietnam community back in 2016.</Text>
      <Text dimColor> Still believe in sharing knowledge and helping others grow.</Text>
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
      <Text>
        {" "}
        <Text color="cyan">→</Text> <Text dimColor>Blog:</Text>{" "}
        <Text color="cyan">{link(links.blog, "12bit.vn")}</Text>
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
    ║                                          ║
    ║   🎮  KONAMI CODE ACTIVATED!  🎮         ║
    ║                                          ║
    ║   You found the secret!                  ║
    ║                                          ║
    ║   Fun fact: I've been coding since       ║
    ║   2011 and still use "console.log"       ║
    ║   for debugging. Some things never       ║
    ║   change. 😄                             ║
    ║                                          ║
    ║   Thanks for exploring my card!          ║
    ║                                          ║
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
  const detail = projectDetails[project];

  useInput((_, key) => {
    if (key.escape) onBack();
    if (key.return) openBrowser(detail.url);
  });

  return (
    <Box flexDirection="column" marginLeft={2}>
      <Text> </Text>
      <Text color="cyan" bold>
        {detail.title}
      </Text>
      <Text> </Text>
      {detail.stats.map((stat, i) => (
        <Text key={i}>
          {" "}
          • <Text color="yellow">{stat}</Text>
        </Text>
      ))}
      <Text> </Text>
      <Text dimColor> {detail.tech}</Text>
      <Text> </Text>
      <Text>
        {" "}
        <Text color="cyan">{link(detail.url, detail.url)}</Text>
      </Text>
      <HintBar hints="Enter to open in browser · Esc to back" />
    </Box>
  );
}

function LinkDetail({ platform: plat, onBack }) {
  const url = links[plat];

  useState(() => {
    openBrowser(url);
  });

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

function ProjectsMenu({ onSelect, onBack }) {
  const items = [
    { label: "Clik", value: "clik", hint: "Screenshot annotations" },
    { label: "Just Read", value: "justread", hint: "Reading helper for learners" },
    { label: "Obsidian Open Gate", value: "obsidian", hint: "Embed webpages in Obsidian" },
  ];

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

function ConnectMenu({ onSelect, onBack }) {
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
        onSelect={(item) => onSelect(item.value)}
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

function App() {
  const [screen, setScreen] = useState("main");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleMainSelect = (value) => setScreen(value);
  const handleProjectSelect = (value) => {
    setSelectedProject(value);
    setScreen("project-detail");
  };
  const handleConnectSelect = (value) => {
    setSelectedPlatform(value);
    setScreen("connect-detail");
  };

  const goToMain = () => setScreen("main");
  const goToProjects = () => setScreen("projects");
  const goToConnect = () => setScreen("connect");

  if (showEasterEgg) {
    return (
      <Box flexDirection="column">
        <Header />
        <EasterEgg onClose={() => setShowEasterEgg(false)} />
      </Box>
    );
  }

  return (
    <Box flexDirection="column">
      <Header />
      {screen === "main" && (
        <MainMenu onSelect={handleMainSelect} onEasterEgg={() => setShowEasterEgg(true)} />
      )}
      {screen === "projects" && <ProjectsMenu onSelect={handleProjectSelect} onBack={goToMain} />}
      {screen === "connect" && <ConnectMenu onSelect={handleConnectSelect} onBack={goToMain} />}
      {screen === "project-detail" && (
        <ProjectDetail project={selectedProject} onBack={goToProjects} />
      )}
      {screen === "connect-detail" && (
        <LinkDetail platform={selectedPlatform} onBack={goToConnect} />
      )}
    </Box>
  );
}

render(<App />);
