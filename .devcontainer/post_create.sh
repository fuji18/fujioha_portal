#!/bin/bash
set -e

echo "=== Post-create setup ==="

# Install Playwright deps
echo "[1/4] Installing Playwright dependencies..."
npx --yes playwright install-deps chromium

# Install Claude Code
echo "[2/4] Installing Claude Code..."
npm install -g @anthropic-ai/claude-code

# Install Serena tooling
echo "[3/4] Installing Serena tooling..."
UV_BIN="$(command -v uv || true)"
if [ -z "$UV_BIN" ] && [ -x "$HOME/.local/bin/uv" ]; then
  UV_BIN="$HOME/.local/bin/uv"
fi

if [ -z "$UV_BIN" ]; then
  curl -LsSf https://astral.sh/uv/install.sh | env UV_NO_MODIFY_PATH=1 sh
  UV_BIN="$HOME/.local/bin/uv"
fi

export PATH="$HOME/.local/bin:$PATH"

if ! command -v serena >/dev/null 2>&1 && [ ! -x "$HOME/.local/bin/serena" ]; then
  "$UV_BIN" tool install -p 3.13 serena-agent@latest --prerelease=allow
fi

# GitHub authentication
echo "[4/4] Setting up GitHub authentication..."
if gh auth status &>/dev/null; then
  echo "  Already authenticated with GitHub."
elif [ -n "$GITHUB_TOKEN" ]; then
  echo "$GITHUB_TOKEN" | gh auth login --with-token
  gh auth setup-git
  echo "  GitHub authentication complete (via GITHUB_TOKEN)."
else
  echo "  ⚠️  Not authenticated. Run 'gh auth login' to authenticate manually."
fi

echo "=== Setup complete ==="
