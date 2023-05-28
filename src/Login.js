require("dotenv").config();
const puppeteer = require("puppeteer");
const path = require("path");

async function Login() {
  try {
    //Inicia o navegador e direciona para a comeia
    const browser = await puppeteer.launch({
      headless: true,
      args: [
	"--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
    });

    const page = await browser.newPage();
    await page.goto("https://app.colmeia.me/auth/signIn");

    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: path.resolve(__dirname, "../uploads"),
    });

    //Insere as credencias de login
    await page.type('[id="mat-input-0"]', process.env.COLMEIA_EMAIL);
    await page.type('[id="mat-input-1"]', process.env.COLMEIA_SENHA);
    await page.click('[class="landing-main-button"]');
    console.log("Fez login");

    return { data: "", message: "OK", contextPage: page };
  } catch (error) {
    return { data: error, message: "ERROR" };
  }
}

module.exports = Login;
