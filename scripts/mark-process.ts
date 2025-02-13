import fs from "fs";
import path from "path";
import { glob } from "glob";

const SENSITIVE_MARKERS = [
    "::CLOUDFLARE_ERROR_500S_BOX::",
    "::CLOUDFLARE_ERROR_1000S_BOX::",
    "::CAPTCHA_BOX::",
    "::IM_UNDER_ATTACK_BOX::",
];

const REPLACEMENT_MARKER = "::MARK_BOX::";

function processFile(filePath: string): void {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        let hasChanges = false;

        let newContent = content;
        for (const marker of SENSITIVE_MARKERS) {
            if (content.includes(marker)) {
                newContent = newContent.replace(new RegExp(marker, "g"), REPLACEMENT_MARKER);
                hasChanges = true;
                console.log(`[Process] Replaced marker in ${filePath}`);
            }
        }

        if (hasChanges) {
            fs.writeFileSync(filePath, newContent, "utf-8");
        }
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

function main() {
    const outDir = path.join(process.cwd(), "out");

    const jsFiles = glob.sync("**/*.js", {
        cwd: outDir,
        absolute: true,
    });

    console.log(`Found ${jsFiles.length} JavaScript files to process`);

    for (const file of jsFiles) {
        processFile(file);
    }

    console.log("Marker processing completed");
}

main();
