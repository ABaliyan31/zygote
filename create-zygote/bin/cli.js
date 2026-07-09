#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");

const REPO_URL = "https://github.com/ABaliyan31/zygote.git";
const SKILL_NAME = "zygote";

const skillsDir = path.join(os.homedir(), ".claude", "skills");
const targetDir = path.join(skillsDir, SKILL_NAME);
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "zygote-"));

try {
  execSync(`git clone --depth 1 "${REPO_URL}" "${tmpDir}"`, {
    stdio: "inherit",
  });

  fs.mkdirSync(skillsDir, { recursive: true });
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  fs.copyFileSync(
    path.join(tmpDir, "SKILL.md"),
    path.join(targetDir, "SKILL.md")
  );
  fs.cpSync(path.join(tmpDir, "templates"), path.join(targetDir, "templates"), {
    recursive: true,
  });

  console.log(`zygote skill installed to ${targetDir}`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
