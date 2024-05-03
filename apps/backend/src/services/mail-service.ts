import nodemailer, { Transporter } from "nodemailer";

class MailService {
	private transporter: Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: "Активация аккаунта в приложениеи TodoIt",
			html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${link}">${link}</a> 
        </div>
      `,
		});
	}

	async sendResetPassword(to: string, resetCode: string) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: "Код для сброса пароля",
			text: resetCode,
		});
	}
}

export const mailService = new MailService();
