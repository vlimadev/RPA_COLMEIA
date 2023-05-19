async function TelaMarketing(contextPage) {
  const page = await contextPage;

  try {
    //aguarda o carregamento da tela e navega até o dashboard de marketing
    await page.waitForNavigation();
    await page.goto("https://app.colmeia.me/dashboard/analytics/marketing/");
    const dashMarketingLinha = await page.waitForXPath(
      '//*[contains(text(), "Marketing Linha a Linha")]'
    );
    await dashMarketingLinha.click();
    await new Promise((r) => setTimeout(r, 10000));
    console.log("Tela de marketing Linha a linha aberta");

    return { data: "", message: "OK" };
  } catch (error) {
    return { data: error, message: "ERROR" };
  }
}

module.exports = TelaMarketing;
