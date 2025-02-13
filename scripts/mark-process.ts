import fs from "fs";
import path from "path";
import { glob } from "glob";
import * as cheerio from "cheerio";

interface MarkerReplacement {
    original: string;
    count: number;
}

const SENSITIVE_MARKERS = [
    "::CLOUDFLARE_ERROR_500S_BOX::",
    "::CLOUDFLARE_ERROR_1000S_BOX::",
    "::CAPTCHA_BOX::",
    "::IM_UNDER_ATTACK_BOX::",
];

const REPLACEMENT_MARKER = "::MARK_BOX::";

const MARKER_REGEXES = SENSITIVE_MARKERS.map((marker) => ({
    regex: new RegExp(marker, "g"),
    original: marker,
}));

function processJSFile(filePath: string): { [key: string]: MarkerReplacement } {
    const replacements: { [key: string]: MarkerReplacement } = {};

    try {
        const content = fs.readFileSync(filePath, "utf-8");
        let newContent = content;
        let hasChanges = false;

        for (const { regex, original } of MARKER_REGEXES) {
            if (content.includes(original)) {
                const matches = content.match(regex);
                const count = matches ? matches.length : 0;

                if (count > 0) {
                    newContent = newContent.replace(regex, REPLACEMENT_MARKER);
                    replacements[original] = { original, count };
                    hasChanges = true;
                }
            }
        }

        if (hasChanges) {
            fs.writeFileSync(filePath, newContent, "utf-8");
            console.log(`[Process] Modified ${filePath}:`);
            Object.values(replacements).forEach(({ original, count }) => {
                console.log(`  - Replaced "${original}" ${count} times`);
            });
        }

        return replacements;
    } catch (error) {
        console.error(`Error processing JS file ${filePath}:`, error);
        return replacements;
    }
}

function processHTMLFile(filePath: string, jsFiles: Set<string>): void {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        const $ = cheerio.load(content);
        let hasChanges = false;

        $("script").each((_, element) => {
            const src = $(element).attr("src");
            if (src) {
                const absolutePath = path.resolve(path.dirname(filePath), src);
                if (jsFiles.has(absolutePath)) {
                    $(element).replaceWith(`<!-- Sensitive marker found - Script removed: ${src} -->`);
                    hasChanges = true;
                    console.log(`[Process] Commented out script tag in ${filePath} for ${src}`);
                }
            }
        });

        if (hasChanges) {
            fs.writeFileSync(filePath, $.html(), "utf-8");
        }
    } catch (error) {
        console.error(`Error processing HTML file ${filePath}:`, error);
    }
}

async function main() {
    const outDir = path.join(process.cwd(), "out");
    console.time("Processing time");

    const sensitiveJSFiles = new Set<string>();
    const stats = {
        totalJSFiles: 0,
        modifiedJSFiles: 0,
        totalHTMLFiles: 0,
        modifiedHTMLFiles: 0,
        replacements: {} as { [key: string]: number },
    };

    const jsFiles = glob.sync("**/*.js", {
        cwd: outDir,
        absolute: true,
    });
    stats.totalJSFiles = jsFiles.length;

    console.log(`Processing ${jsFiles.length} JavaScript files...`);

    for (const file of jsFiles) {
        const fileReplacements = processJSFile(file);
        if (Object.keys(fileReplacements).length > 0) {
            sensitiveJSFiles.add(file);
            stats.modifiedJSFiles++;

            Object.values(fileReplacements).forEach(({ original, count }) => {
                stats.replacements[original] = (stats.replacements[original] || 0) + count;
            });
        }
    }

    const htmlFiles = glob.sync("**/*.html", {
        cwd: outDir,
        absolute: true,
    });
    stats.totalHTMLFiles = htmlFiles.length;

    console.log(`Processing ${htmlFiles.length} HTML files...`);

    for (const file of htmlFiles) {
        processHTMLFile(file, sensitiveJSFiles);
    }

    console.timeEnd("Processing time");

    console.log("\nProcessing Summary:");
    console.log(`JS Files: ${stats.modifiedJSFiles} modified out of ${stats.totalJSFiles}`);
    console.log(`HTML Files: ${stats.modifiedHTMLFiles} modified out of ${stats.totalHTMLFiles}`);
    console.log("\nReplacement Statistics:");
    Object.entries(stats.replacements).forEach(([marker, count]) => {
        console.log(`- "${marker}": ${count} replacements`);
    });
}

main().catch(console.error);
