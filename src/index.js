const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
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

  //aguarda o carregamento da tela e navega até o dashboard de marketing
  await page.waitForNavigation();
  await page.goto("https://app.colmeia.me/dashboard/analytics/marketing/");
  const dashMarketingLinha = await page.waitForSelector(
    "#dashboard-view-content > app-power-bi-dashboard-page > app-power-bi-dashboard-list > div > section > mat-card:nth-child(5)"
  );
  await dashMarketingLinha.click();
  await new Promise((r) => setTimeout(r, 15000));
  console.log("foi pra tela de MKT");

  // // navega ate resposta por target
  const iframe = await page.waitForSelector("#tableauViz > iframe");
  const iframeCt = await iframe.contentFrame();
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click('[id="tableauTabbedNavigation_tab_1"]');
  console.log("resposta portarget");

  // clica no botão de filtro
  await iframeCt.waitForNavigation('[id="tabZoneId6"]', { timeout: 8000 });
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click('[id="tabZoneId6"]');
  await new Promise((r) => setTimeout(r, 5000));
  console.log("filtro");

  //clica no dropdown e selceciona a opção "ontem e fecha o filtro"
  await iframeCt.click('[id="dijit_form_DropDownButton_0"]');
  await iframeCt.click('[class="column1"]');
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click('[id="dijit_form_DropDownButton_0"]');
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click(' [id="tableau_base_widget_QuickFilterPanel_1"]');
  await new Promise((r) => setTimeout(r, 3000));
  await iframeCt.click(' [id="dijit_form_Button_3"]');
  await new Promise((r) => setTimeout(r, 3000));
  await iframeCt.click('[id="tabZoneId6"]');
  await new Promise((r) => setTimeout(r, 5000));
  console.log("dropdown");

  // clica em dowload
  await iframeCt.click('[id="tabZoneId134"]');
  await new Promise((r) => setTimeout(r, 5000));

  await iframeCt.click(
    "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div:nth-child(1) > div.f1lp596a > div > div > div:nth-child(2)"
  );
  await iframeCt.click(
    "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div.fdr6v0d > button"
  );
  await new Promise((r) => setTimeout(r, 10000));
  console.log("dowload");

  // navega ate Templates por target
  await iframeCt.click('[id="tableauTabbedNavigation_tab_2"]');
  // clica no botão de filtro
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
  await new Promise((r) => setTimeout(r, 10000));

  // clica no dropdown e selceciona a opção "ontem e fecha o filtro"
  await iframeCt.click("#dijit_form_DropDownButton_1_label");
  await iframeCt.click('[class="column1"]');
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click("#dijit_form_DropDownButton_1_label");
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click(
    " #tableau_base_widget_LegacyQuantitativeDateQuickFilter_1"
  );
  await new Promise((r) => setTimeout(r, 3000));
  await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
  await new Promise((r) => setTimeout(r, 3000));

  // clica em dowload
  await iframeCt.click('[id="tabZoneId134"]');
  await new Promise((r) => setTimeout(r, 3000));
  await iframeCt.click(
    "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div:nth-child(1) > div.f1lp596a > div > div > div:nth-child(2)"
  );
  await iframeCt.click(
    "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div.fdr6v0d > button"
  );
  await new Promise((r) => setTimeout(r, 10000));

  // navega ate disparo por status
  await iframeCt.click('[id="tableauTabbedNavigation_tab_6"]');

  // clica no botão de filtro
  await new Promise((r) => setTimeout(r, 10000));
  await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
  await new Promise((r) => setTimeout(r, 5000));

  // clica no dropdown e selceciona a opção "ontem e fecha o filtro"
  await iframeCt.click("#dijit_form_DropDownButton_2");
  await iframeCt.click('[class="column1"]');
  await new Promise((r) => setTimeout(r, 8000));
  await iframeCt.click("#dijit_form_DropDownButton_2");
  await new Promise((r) => setTimeout(r, 5000));
  await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
  await new Promise((r) => setTimeout(r, 3000));

  // clica em dowload
  await iframeCt.click('[id="tabZoneId134"]');
  await new Promise((r) => setTimeout(r, 3000));
  await iframeCt.click(
    "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div.fdr6v0d > button"
  );
  await new Promise((r) => setTimeout(r, 10000));

  await page.close();
})();
