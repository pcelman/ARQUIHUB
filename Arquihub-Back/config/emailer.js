const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")
const { SENDGRID_APIKEY } = process.env

const createTrans=()=>{

    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: SENDGRID_APIKEY
        })
    )

      return transport
    }


    const sendMail = async(email, subject, html)=>{
        const transporter = createTrans()
        const info = await transporter.sendMail({
            from:"'Arquihub' <arquihubHenry@gmail.com >",
            to: `${email}`,
            subject,
            html,
            
        })
        console.log("Message sent ", info.messageId)
    
        return
    }

exports.sendMail=(email, subject, html)=> sendMail(email, subject, html)