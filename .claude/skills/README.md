# Claude Skills

This directory contains specialized skills that enhance Claude's frontend development capabilities. These skills are based on the [taste-skill](https://github.com/Leonxlnx/taste-skill) repository.

## Available Skills

### 1. taste-skill.md
The main design skill. Teaches Claude how to write premium frontend code from scratch. Covers layout, typography, colors, spacing, motion, and overall visual quality.

**Settings (configurable 1-10):**
- **DESIGN_VARIANCE (8):** How experimental the layout is
- **MOTION_INTENSITY (6):** How much animation there is
- **VISUAL_DENSITY (4):** How much content fits on screen

### 2. soft-skill.md
Focuses on making interfaces look and feel expensive. Covers premium fonts, breathing whitespace, layered card designs with depth, smooth spring-based animations, and floating navigation. Bans generic defaults.

### 3. minimalist-skill.md
For clean, editorial-style interfaces inspired by Notion and Linear. Enforces warm monochrome palettes, serif/sans-serif typographic contrast, massive whitespace, flat bento grids with crisp hairline borders, and muted pastel accents.

### 4. redesign-skill.md
For upgrading existing projects. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework.

### 5. output-skill.md
Prevents lazy outputs. Stops placeholder comments, skipped code blocks, and half-finished implementations. Forces complete code generation instead of shortcuts.

## How to Use

Reference these skills in your prompts when working with Claude:
- For new projects: Use `taste-skill.md` or `minimalist-skill.md`
- For existing projects: Use `redesign-skill.md`
- For premium agency-level work: Use `soft-skill.md`
- For complete implementations: Use `output-skill.md`

## Credit

These skills are based on the excellent work by [@lexnlin](https://x.com/lexnlin).
Original repository: https://github.com/Leonxlnx/taste-skill
