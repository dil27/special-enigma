# ZR WhatsApp API

WhatsApp Unofficial API using ExpressJS and Node.js API.

Reference: [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

<br/>

---
> <br>
>
> ## Requirements:
>
> - NodeJS v12 or Higher
>
> <br>
>
> ## Used Libraries:
>
> - body-parser
> - express
> - express-validator
> - http
> - qrcode
> - socket.io
> - whatsapp-web.js
>
> <br>
>
<br/>

---

## Installation:
```
npm install
```

<br/>

---

## Usage:
```
npm run start
```
OR (Optional. if you using Nodemon.)

```
npm run start:dev
```
<br/>

---

<br>

# API Docs

### `POST` `/send-message`


```json
{
    "phoneNumber": "081xxxxxxxxx",
    "message": "Messages",
}
```

### `POST` `/send-media`
```json
{
    "phoneNumber": "081xxxxxxxxx",
    "message": "Image Caption",
    "imageUrl": "https://newjeans.kr/imgs/window/new-folder-1/nj_omg_2.jpg"
}
```

### `POST` `/send-button`
```json
{
    "phoneNumber": "081xxxxxxxxx",
    "message": "Button Body",
    "buttons": {
        "buttons": ["1st Button", "2nd Button", "3rd Button"],
        "title": "Button Title",
        "footer": "Button Footer"
    }
}
```

### `POST` `/send-list`
```json
{
    "phoneNumber": "081xxxxxxxxx",
    "message": "List Body",
    "list": {
        "title": "List Title",
        "sections": [
            {
                "title": "First Section",
                "rows": [
                    {
                        "title": "First List on First Section",
                        "description": "First Description on First Section"
                    },
                    {
                        "title": "Second List on First Section",
                        "description": "Second Description on First Section"
                    }
                ]
            },
            {
                "title": "Second Section",
                "rows": [
                    {
                        "title": "First List on Second Section"
                    },
                    {
                        "title": "Second List on Second Section"
                    },
                    {
                        "title": "Third List on Second Section"
                    }
                ]
            }
        ]
    }
}
```
