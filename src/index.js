require('dotenv').config();

const Login = require('./Login');
const TelaMarketing = require('./TelaMatketing');
const RespostaPorTarget = require('./RespostaPorTarget');
const TemplatePorTarget = require('./TemplatePorTarget');
const DisparoPorStatus = require('./DisparoPorStatus');
const ObservarPastaUploads = require('./ObservarPastaUploads');

(async () => {
	try {
		Login().then((resp) => {
			if (resp.message === 'OK') {
				console.log('Etapa: Login concluida com sucesso!');

				TelaMarketing(resp.contextPage).then((respTelaMarketing) => {
					if (respTelaMarketing.message === 'OK') {
						console.log('Etapa: Tela de marketing concluida com sucesso!');

						RespostaPorTarget(resp.contextPage).then(
							(respRespostaPorTarget) => {
								if (respRespostaPorTarget.message === 'OK') {
									console.log(
										'Etapa: Resposta por Target concluida com sucesso!',
									);
									TemplatePorTarget(resp.contextPage).then(
										(respTemplatePorTarget) => {
											if (respTemplatePorTarget.message === 'OK') {
												console.log(
													'Etapa: Template por target concluida com sucesso',
												);
												DisparoPorStatus(resp.contextPage).then(
													(respDisparoPorStatus) => {
														if (respDisparoPorStatus.message === 'OK') {
															console.log(
																'Etapa: Disparo por status concluida com sucesso',
															);

															process.exit();
														} else {
															console.log(
																'Não foi possivel acessar Disparo por status:',
																respDisparoPorStatus,
															);
															process.exit();
														}
													},
												);
											} else {
												console.log(
													'Não foi possivel acessar Template por target:',
													respRespostaPorTarget.data,
												);
												process.exit();
											}
										},
									);
								} else {
									console.log(
										'Não foi possivel acessar Resposta por Target:',
										respRespostaPorTarget.data,
									);
									process.exit();
								}
							},
						);
					} else {
						console.log(
							'Não foi possivel acessar a tela de marketing:',
							respTelaMarketing.data,
						);
						process.exit();
					}
				});
			} else {
				console.log('Não foi possivel efetuar o login:', resp.data);
				process.exit();
			}
		});
	} catch (error) {
		console.log('não foi possivel executar o fluxo:', error);
		process.exit();
	}
})();
