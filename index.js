const express = require('express');
const bodyParser = require('body-parser')
const qrcode = require('qrcode');
const http = require('http');
const client = require('./apis/whatsapp.js');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8000;
const route = require('./route/whatsapp.js');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', route);
app.use('/assets', express.static('assets'));

app.use((req, res) => {
    res.end(JSON.stringify(req.body, null, 2))
})

io.on('connection', (socket) => {
    socket.emit('status', 1001);
    
    client.on('ready', () => {
        socket.emit('status', 1002);
    });

    client.on('qr', qr => {
        console.log(qr);
        qrcode.toDataURL(qr, (err, url) => {
            if (err) {
                socket.emit('message', err);
            } else {
                socket.emit('qr', url);
            }
        });
    });

    client.on('authenticated', () => {
        socket.emit('status', 1003);
    });

    client.on('message', msg => {
        var content = msg.body.toLowerCase();
        var sender = msg._data.notifyName || "";
        var stringReply = "";

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = today.getMonth()
        var yyyy = today.getFullYear();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        today = `Cimahi, ${dd} ${month[mm]}, ${yyyy}`;

        var ucapans = [
            'Selamat hari raya Idul Fitri 2023/1444 H, mohon maaf lahir dan batin. Semoga Allah senantiasa memberikan rahmat dan hidayah-Nya untuk kita semua',
            'Di hari yang penuh berkah ini, izinkan saya mengucapkan selamat Idul Fitri 1444 H, mohon maaf lahir dan batin. Semoga kita selalu mendapatkan kemuliaan dan keselamatan dalam hidup kita',
            'Dalam suasana yang penuh rahmat ini, mari kita saling memaafkan dan merayakan kemenangan bersama. Selamat Idul Fitri 2023/1444 H, mohon maaf lahir dan batin',
            'Di hari yang fitri ini, semoga kita semua bisa meraih keberkahan yang Allah berikan dan menjadi pribadi yang lebih baik. Selamat Idul Fitri 2023, mohon maaf lahir dan batin',
            'Selamat Idul Fitri, mohon maaf lahir dan batin. Saya berharap kita selalu diberkahi Allah dengan kesehatan, kebahagiaan, dan kesuksesan dalam hidup',
            'Selamat Hari Raya Idul Fitri 1444 H. Mohon maaf lahir dan batin. Semoga kita selalu berada dalam lindungan-Nya dan menjadi pribadi yang lebih baik',
            'Di hari kemenangan ini, saya mengucapkan Selamat Idul Fitri 1444 H. Mohon maaf lahir dan batin. Semoga keberkahan dan kebahagiaan selalu menyertai langkah kita',
            'Selamat Hari Raya Idul Fitri, mohon maaf lahir dan batin. Semoga Allah senantiasa melimpahkan rahmat-Nya dan memberikan kemudahan dalam setiap langkah kita',
            'Di hari yang suci ini, izinkan saya mengucapkan Selamat Idul Fitri. Mohon maaf lahir dan batin. Semoga kita selalu diberkahi oleh Allah dengan kesehatan, kebahagiaan, dan keberkahan',
            'Selamat Idul Fitri, mohon maaf lahir dan batin. Semoga Allah senantiasa memberikan kemudahan dalam segala urusan kita dan menjaga kita dari segala mara bahaya',
            'Taqabbalallahu minna wa minkum. Semoga Allah menerima amal ibadah kita selama bulan Ramadan dan memberikan berkah-Nya kepada kita. Mari kita terus menjaga kesucian hati dan memperkuat iman kepada-Nya.\nMohon maaf lahir dan batin',
            'Selamat Hari Raya Idul Fitri! Semoga hari ini membawa kita lebih dekat kepada Allah dan mengisi hati kita dengan kedamaian, kebahagiaan, dan cinta kepada sesama. Mari kita selalu berusaha menjadi pribadi yang lebih baik dan meningkatkan kualitas hidup kita.\nMohon maaf lahir dan batin',
            'Mohon maaf lahir dan batin. Semoga Allah melimpahkan rahmat dan berkah-Nya pada Anda dan keluarga di Hari Raya Idul Fitri. Mari kita terus memperkuat tali silaturahmi dan saling bermaafan atas kesalahan dan khilaf yang telah dilakukan',
            'Selamat Hari Raya Idul Fitri 1444 H! Mohon maaf lahir dan batin.\n\nMari kita terus memperkuat iman dan taqwa kepada Allah serta mengamalkan nilai-nilai Islam dalam kehidupan sehari-hari. Semoga Allah selalu memberikan rahmat-Nya kepada kita',
            'Mohon maaf lahir dan batin atas segala kesalahan dan khilaf selama menjalankan ibadah puasa dan selama hidup kita. Mari kita senantiasa berusaha memperbaiki diri dan menjadi pribadi yang lebih baik di mata Allah dan sesama',
            'Mohon maaf lahir dan batin. Semoga Allah memberikan kebahagiaan, kesehatan, dan kesuksesan pada kita semua di Hari Raya Idul Fitri. Mari kita terus berdoa dan berusaha untuk meraih kebahagiaan dunia dan akhirat dengan cara yang baik dan benar',
            'Selamat Idul Fitri 2023/1444 H! Mohon maaf lahir dan batin. Mari kita jadikan momen ini sebagai awal yang baru untuk memperbaiki diri dan meningkatkan kualitas hidup kita. Semoga kita selalu mendapatkan petunjuk dari Allah dan meraih ridho-Nya',
            'Mohon maaf atas segala kekhilafan dan kesalahan yang telah dilakukan selama ini. Semoga kita semua selalu diberikan petunjuk oleh Allah dan senantiasa berusaha untuk menjadi pribadi yang lebih baik di mata-Nya',
            'Selamat Idul Fitri 1444 H! Mohon maaf lahir dan batin. Semoga hati kita selalu penuh dengan kasih sayang dan kebaikan kepada sesama. Mari kita saling mendukung dan membantu satu sama lain untuk mencapai kesuksesan dunia dan akhirat',
            'Mohon maaf lahir dan batin atas segala kekurangan dan kesalahan. Semoga kita selalu diberikan keberkahan oleh Allah dan dapat memperkuat iman serta taqwa kepada-Nya. Aamiin'
        ];

        
        if (content.includes('taqabbalallahu') || content.includes('minal') || content.includes('minnal') || content.includes('maaf')) {
            if (sender.length > 3) {
                stringReply += `Halo, @${sender}!\n\n`;
                stringReply += ucapans[randomInteger(0, ucapans.length-1)];
            } else {
                stringReply += `Minal aidzin walfaidzin.`;
            }
            stringReply += `🙏\n\n${today}\nFhadilah Muchsin & Keluarga.`;
            stringReply += `\n\n\n_This text is AI generated by ArtProject. Fhadil will reply this as soon as possible._`
            msg.reply(stringReply);
        }
        console.log(msg);
        socket.emit('message', "From: "+sender+" \""+content+"\"");
    })
});

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.listen(PORT, () => {
    console.log(`ZR WhatsApp API is running on port *:${PORT}`);
});