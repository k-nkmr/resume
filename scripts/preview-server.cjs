const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { marked } = require("marked");

const root = path.resolve(__dirname, "..");
const hostname = "127.0.0.1";
const port = Number(process.env.RESUME_PREVIEW_PORT || 4173);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function readResume() {
  const source = fs.readFileSync(path.join(root, "index.md"), "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  const frontMatter = match?.[1] ?? "";
  const body = match ? source.slice(match[0].length) : source;
  const title = frontMatter.match(/^title:\s*(.+)$/m)?.[1] ?? "職務経歴書";

  return { title, body };
}

function renderPage() {
  const { title, body } = readResume();
  const webCss = fs.readFileSync(path.join(root, "_sass/web-theme.scss"), "utf8");
  const themeScript = fs.readFileSync(path.join(root, "assets/js/theme.js"), "utf8");
  const content = marked.parse(body, { gfm: true });

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)} | ローカルプレビュー</title>
    <script>
      (() => {
        const saved = localStorage.getItem("resume-theme");
        const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.dataset.theme = dark ? "dark" : "light";
      })();
    </script>
    <style>
      ${webCss}
    </style>
  </head>
  <body>
    <button class="theme-toggle" type="button" aria-label="表示テーマを切り替える"></button>
    <main class="resume-shell">
      <div class="preview-notice">ローカルプレビュー — index.md を編集後、ブラウザを更新すると反映されます。</div>
      ${content}
    </main>
    <script>${themeScript}</script>
  </body>
</html>`;
}

const server = http.createServer((request, response) => {
  if (request.url !== "/" && request.url !== "/index.html") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not Found");
    return;
  }

  try {
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(renderPage());
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(error.stack);
  }
});

server.listen(port, hostname, () => {
  console.log(`Resume preview: http://${hostname}:${port}`);
});
