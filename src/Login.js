require('dotenv').config();
const puppeteer = require('puppeteer');
const path = require('path');

async function Login() {
	const args =
		process.env.NODE_ENV === 'production'
			? [
					'--disable-gpu',
					'--disable-dev-shm-usage',
					'--disable-setuid-sandbox',
					'--no-sandbox',
			  ]
			: ['--start-maximized'];

	const launchOptions = {
		headless: 'new',
		args: args,
		defaultViewport: {
			width: 1366,
			height: 768,
		},
	};

	if (process.env.NODE_ENV !== 'production') {
		Object.assign(launchOptions, {
			devtools: true,
			slowMo: Number(process.env.ENV_SLOW_PUPPETEER || 1000),
		});
	}

	if (process.env.NODE_ENV === 'production') {
		Object.assign(launchOptions, { ignoreHTTPSErrors: true });
	}

	try {
		//Inicia o navegador e direciona para a comeia
		const browser = await puppeteer.launch(launchOptions);

		const page = await browser.newPage();
		await page.goto('https://app.colmeia.me/auth/signIn');

		const client = await page.target().createCDPSession();
		await client.send('Page.setDownloadBehavior', {
			behavior: 'allow',
			downloadPath: path.resolve(__dirname, '../uploads'),
		});

		//Insere as credencias de login
		await page.type('[id="mat-input-0"]', process.env.COLMEIA_EMAIL);
		await page.type('[id="mat-input-1"]', process.env.COLMEIA_SENHA);
		await page.click('[class="landing-main-button"]');
		console.log('Fez login');

		return { data: '', message: 'OK', contextPage: page };
	} catch (error) {
		return { data: error, message: 'ERROR' };
	}
}

module.exports = Login;
