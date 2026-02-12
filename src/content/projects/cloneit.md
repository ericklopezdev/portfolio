---
title: CloneIt
description: A cross-platform CLI tool to interactively clone GitHub repositories with TUI and shell script interfaces.
date: 2025-02-01
tags: ['Go', 'CLI', 'GitHub', 'TUI', 'fzf']
image: /images/projects/cloneit.png
github: https://github.com/ericklopezdev/cloneit
---

# CloneIt

A cross-platform CLI tool to interactively clone GitHub repositories. It offers two interfaces: a Go-based Terminal User Interface (TUI) and a shell script using `gh` and `fzf` for selection.

## Interfaces

### Go TUI (Recommended)
An intuitive terminal user interface built in Go for selecting and cloning repositories.

**Usage:**
1. Ensure you are authenticated with GitHub CLI: `gh auth login`
2. Run: `cloneit`
3. Use the interactive TUI to select and clone a repository

### Shell Script with fzf
A lightweight shell script that uses `gh` and `fzf` for fuzzy search and selection.

**Usage:**
1. Ensure you are authenticated with GitHub CLI: `gh auth login`
2. Run: `./cloneit.sh`
3. Use fuzzy search to select a repository
4. The tool will clone the selected repository to the current directory

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated
- `fzf` installed for interactive selection
- `jq` for JSON processing

## Installation

### Option 1: Auto-install (Recommended)
```bash
curl -fsSL https://raw.githubusercontent.com/ericklopezdev/cloneit/main/install.sh | bash
```
This will download the latest release binary for your platform and install it to `/usr/local/bin` or `~/.local/bin`.

### Option 2: Manual Install
1. Go to [Releases](https://github.com/ericklopezdev/cloneit/releases) and download the appropriate archive for your OS and architecture
2. Extract the archive
3. Move the `cloneit` binary to a directory in your PATH (e.g., `/usr/local/bin` or `~/bin`)

### For Windows Users
Download the `.zip` file from releases, extract, and add `cloneit.exe` to your PATH.

## Tech Stack

- **Language**: Go
- **CLI Tools**: GitHub CLI (gh), fzf
- **Utilities**: jq for JSON processing
