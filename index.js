const { rejects } = require('assert');
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public') ));


app.get( '/', (req, res)=> {

    res.sendFile(__dirname +'/index.html');

});



app.post('/send-email', async (req, res) =>{

    const {email, phone, message} = req.body;
   // console.log(req.body);
    

    contentHTML = `

        <h1> User information</h1>

        <ul>
            <li> email: ${email}</li>
            <li> phone: ${phone}</li>
        </ul>

        <p> message: ${message}</p>
    `;

    console.log(contentHTML)

    

const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth:{
        user: 'infotecnoferllc@gmail.com',
        pass: 'qpuosisrhzlgsatf'
    },

    tls: {
        rejectUnauthorized: false
    }
})

const info = await transporter.sendMail({
    from: 'infotecnoferllc@gmail.com',
    to: 'infotecnoferllc@gmail.com',
    subject: 'mail sent from web page',
    html: contentHTML
    
});

    console.log('message sended', message.id);

    res.send('resived');
});


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, ()=>{
    console.log('app on port 3000');
});