// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Message, SMTPClient } from 'emailjs';

interface IEmail {
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
}

interface IBody {
  email: string;
  cellphone: string;
  description: string;
  name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
  ) {
    try {
      const data : IBody = req.body;
      const smtp = new SMTPClient({
        user: process.env.mail,
        password: process.env.password,
        host: 'smtpout.secureserver.net',
        ssl:true
      });

      

      smtp.send({
        from: "teste@email.com",
        to: "teste@teste.com",
        text: data.description,
        subject: "Solicitação de serviço"
      }, (e, m) => console.log(e, m));

      return res.status(200).json({ success: true })
    } catch (error) {
      console.log(error);

      return res.status(200).json({ success: true })
    }
}