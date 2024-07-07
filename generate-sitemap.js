const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://www.yourwebsite.com",
  }); // Change to your domain
  const writeStream = createWriteStream(
    path.resolve(__dirname, "public", "sitemap.xml")
  );

  sitemap.pipe(writeStream);

  // Manually add your static routes here
  const routes = [{ url: "/", changefreq: "weekly", priority: 1.0 }];

  routes.forEach((route) => sitemap.write(route));

  sitemap.end();

  try {
    await streamToPromise(sitemap);
    console.log("Sitemap created successfully!");
  } catch (err) {
    console.error("Error creating sitemap:", err);
  }
}

generateSitemap();
