import * as nodeMailer from 'nodemailer';
import * as redis from './redisClient.util';
import * as utils from './numUtils.util';
import {mailConf as mail_config} from '../config/mailConfig';
// INFO :: If you want to start local Dev, You must create mailConfig.ts.

export const sendMail = (req, res) => {
    const CODE = utils.getRandomInt(100000, 999999);

    const transporter = nodeMailer.createTransport({
        // @ts-ignore
        service: 'gmail',
        auth: {
            type: process.env.MAIL_TYPE || mail_config.type,
            user: process.env.MAIL_USER || mail_config.user,
            clientId: process.env.MAIL_CLIENT_ID || mail_config.clientId,
            clientSecret: process.env.MAIL_CLIENT_SECRET || mail_config.clientSecret,
            refreshToken: process.env.MAIL_REFRESH_TOKEN || mail_config.refreshToken,
            accessToken: process.env.MAIL_ACCESS_TOKEN || mail_config.accessToken,
            expires: process.env.MAIL_EXPIRES || mail_config.expires,
        },
    });
    const mailOptions = {
        from: {
            name: 'Toy-blind',
            address: '1ilsangc@gmail.com',
        }, // sender address
        to: {
            address: `${req.body.email}`,
        }, // list of receivers
        subject: 'Hello. Please enter your verification code in blind', // Subject line
        text: `${CODE}`, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // @ts-ignore
    transporter.sendMail(mailOptions, (error, success) => {
        if (error) res.status(400).send({success: false});
        else redis.client.set(`${req.body.email}`, `${CODE}`, 'EX', 500, (err, reply) => {
                if (err) res.status(400).send({success: false});
                else res.status(200).send({success: true});
            });
    });
};
