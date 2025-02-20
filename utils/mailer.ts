import nodemailer from 'nodemailer';

export const sendVerificationCode = async (email: string, code: string) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail', // O usa SMTP si prefieres
		auth: {
			user: process.env.EMAIL_USER, // Configura en .env
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Código de verificación',
		text: `Tu código de verificación es: ${code}`,
	};

	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error('Error al enviar el correo:', error);
	}
};
