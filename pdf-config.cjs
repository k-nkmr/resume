const path = require("node:path");

module.exports = {
  stylesheet: [path.join(__dirname, "styles", "resume.css")],
  body_class: ["markdown-body"],
  pdf_options: {
    format: "A4",
    margin: "18mm 16mm 18mm 16mm",
    printBackground: true
  },
  marked_options: {
    gfm: true
  }
};
