import { exec } from "child_process";

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout.trim());
    });
  });
};

const updatePackages = async () => {
  try {
    console.log("🔍 Checking for outdated packages...");
    const outdatedJson = await runCommand("npm outdated --json");
    
    if (!outdatedJson) {
      console.log("👍 All packages are already up-to-date.");
      return;
    }

    const outdated = JSON.parse(outdatedJson);
    const packages = Object.keys(outdated);

    if (packages.length === 0) {
      console.log("👍 All packages are already up-to-date.");
      return;
    }

    for (const pkg of packages) {
      console.log(`🚀 Updating ${pkg} to the latest version...`);
      await runCommand(`npm install ${pkg}@latest`);
    }

    console.log("✅ All packages updated successfully!");
  } catch (error) {
    console.error("❌ An error occurred:", error.message);
  }
};

updatePackages();
