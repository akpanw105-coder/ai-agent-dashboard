# DESIGN.md - Obsidian Cybernetic Swarm Design System

**Project:** NexusAI - Autonomous Agent SaaS Platform  
**System Name:** Obsidian Cybernetic Swarm  
**Color Mode:** Dark (Fidelity Obsidian)  
**Primary Accent:** `#8b5cf6` (Electric Violet)  
**Secondary Accent:** `#06b6d4` (Luminous Cyan)  
**Success / Active:** `#10b981` (Emerald Cybernetic)  
**Warning / Standby:** `#f59e0b` (Amber Beacon)  
**Error / Alert:** `#f43f5e` (Crimson Rose)  
**Background Canvas:** `#0a0d14` / `#10131a`  

---

## 1. Brand & Style Philosophy
The design system delivers an enterprise-grade, mission-critical operations console for orchestrating autonomous AI agent swarms and concurrent real-time execution pipelines. It merges technical rigor with a modern cybernetic aesthetic—balancing the high-density information architecture of an observability control room with the precision of developer tooling.

The emotional signature is commanding, calm, and hyper-responsive: engineers and enterprise operators must feel absolute transparency, deterministic control, and situational clarity over distributed non-deterministic agent workflows. The visual style sits at the intersection of **Dark Mode Technical Minimalism** and **Refined Cybernetic Glassmorphism**—relying on layered obsidian surfaces, ultra-fine directional luminescence, hairline border treatments, and concentrated neon status cues rather than indiscriminate illumination.

---

## 2. Color Palette & Semantic Tokens

### Canvas & Surface Hierarchy
| Token | Hex Value | Role & Usage |
|---|---|---|
| `--color-canvas-base` | `#0a0d14` | Deep obsidian baseline background |
| `--color-surface-dim` | `#10131a` | Dark operational background container |
| `--color-surface-container-low` | `#191b23` | Sidebar containers, docked modules |
| `--color-surface-container` | `#1d1f27` | Interactive cards, panel backgrounds |
| `--color-surface-container-high` | `#272a32` | Elevated cards, focused panels |
| `--color-surface-container-highest` | `#32353d` | Modals, drawers, command palette backings |
| `--color-surface-bright` | `#363941` | Hover fills, subtle bevel highlights |

### Text & Contrast Tokens
| Token | Hex Value | Role & Usage |
|---|---|---|
| `--color-on-background` | `#e1e2ec` | High contrast primary text & headings |
| `--color-on-surface` | `#e1e2ec` | Card headlines, primary data figures |
| `--color-on-surface-variant` | `#cbc3d7` | Body text, descriptive strings |
| `--color-outline` | `#958ea0` | Secondary icons, inactive borders |
| `--color-outline-variant` | `#494454` | Hairline card borders, subtle grid dividers |

### Cybernetic Signal Vectors
| Token | Hex Value | Role & Usage |
|---|---|---|
| `--color-primary` | `#8b5cf6` | Electric violet - Neural logic, core agents, primary CTAs |
| `--color-primary-container` | `#a078ff` | Primary active glow / hover fill |
| `--color-secondary` | `#06b6d4` | Luminous cyan - Vector I/O, telemetry readouts, streams |
| `--color-secondary-container` | `#03b5d3` | Data stream highlight & focused borders |
| `--color-tertiary` | `#10b981` | Emerald green - Online, active ping, 100% health |
| `--color-warning` | `#f59e0b` | Amber - Throttled, paused, human-in-the-loop required |
| `--color-error` | `#f43f5e` | Crimson rose - Termination, deadlocks, error logs |

---

## 3. Typography Hierarchy
A deliberate dual-engine strategy:
- **Plus Jakarta Sans**: Humanist clarity and geometric efficiency for headers, navigation, badges, and labels.
- **JetBrains Mono**: Tabular telemetry, execution timestamps, token metrics, code JSON payloads, and terminal traces.

| Style Token | Font Family | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| `headline-xl` | Plus Jakarta Sans | 36px | 700 | 44px | -0.025em |
| `headline-lg` | Plus Jakarta Sans | 24px | 600 | 32px | -0.02em |
| `headline-md` | Plus Jakarta Sans | 18px | 600 | 26px | -0.015em |
| `body-lg` | Plus Jakarta Sans | 16px | 400 | 24px | -0.005em |
| `body-md` | Plus Jakarta Sans | 14px | 400 | 20px | 0em |
| `body-sm` | Plus Jakarta Sans | 12px | 400 | 18px | 0.01em |
| `code-display` | JetBrains Mono | 15px | 500 | 22px | -0.01em |
| `code-body` | JetBrains Mono | 13px | 400 | 20px | 0em |
| `code-sm` | JetBrains Mono | 11px | 500 | 16px | 0.02em |
| `label-caps` | JetBrains Mono | 10px | 600 | 14px | 0.08em |

---

## 4. Spacing, Elevation & Shapes

### Elevation & Backdrop Blur
- **Level 1 (Docked Modules):** `background: rgba(17, 23, 38, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.06);`
- **Level 2 (Cards & Active Panels):** `background: rgba(22, 31, 54, 0.8); backdrop-filter: blur(16px); border: 1px solid rgba(139, 92, 246, 0.16);`
- **Level 3 (Command Overlays / Modals):** `background: rgba(28, 39, 68, 0.92); backdrop-filter: blur(24px); box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.6), 0 0 24px -2px rgba(6, 182, 212, 0.15);`

### Geometry & Border Radii
- **Form Inputs & Action Buttons:** `rounded` (4px / 0.25rem) or `rounded-md` (6px)
- **Telemetry Panels & Cards:** `rounded-lg` (8px / 0.5rem)
- **Modal Windows & Viewports:** `rounded-xl` (12px / 0.75rem)
- **Status Indicators & Metadata Pills:** `rounded-full` (9999px)

---

## 5. Reusable Component Catalog
1. **TopNav Header (`Header.tsx`):** Logo, operational status beacon, omni-search shortcut, cluster dropdown, alert bell, deploy CTA, user avatar.
2. **Sidebar Navigation (`Sidebar.tsx`):** Nav links (Overview, Swarms, Logs, Studio, Integrations, Analytics, Settings), GPU quota meter, active tab indicator.
3. **Metric Card (`MetricCard.tsx`):** Title, current value, delta trend badge, sparkline or sub-indicator.
4. **Agent Card (`AgentCard.tsx`):** Agent ID, status badge, current task, progress bar, CPU/RAM/Latency gauges, control buttons (Pause, Terminal, Inspect).
5. **Swarm Card (`SwarmCard.tsx`):** Swarm title, coordinator agent, topology member chips, throughput, token burn rate, scale/pause controls.
6. **Thought Stream Console (`ThoughtStreamConsole.tsx`):** Live terminal feed with reasoning trace, tool invocation pills, JSON preview, copy/export controls.
7. **Trace Inspector (`TraceInspector.tsx`):** Dual-pane trace viewer with multi-stage reasoning chain, context token bar, JSON parameter viewer, and latency waterfall.
8. **Deploy Agent Modal (`DeployAgentModal.tsx`):** Interactive modal for configuring and deploying a new autonomous agent.
