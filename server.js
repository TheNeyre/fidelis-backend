import { B24Hook, EnumCrmEntityTypeId } from '@bitrix24/b24jssdk';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

app.get('/api/cars', (req, res) => {
  pool.query("SELECT * FROM cars", (err, result, fields) => {
    if (err) {
      const errRes = res.status(500).json({ error: err.message });
      console.error(err);
      console.log(errRes);
      return errRes;
    }
    res.json(result)
  })
})

app.post('/api/send_form', (req, res) => {

  const phone = req.body.phonenumber;
  const email = req.body.email;
  const name = req.body.username;

  const $b24 = B24Hook.fromWebhookUrl(process.env.B24_WEEBHOOK_TOKEN);
  const response = $b24.actions.v2.call.make({
    method: 'crm.item.add',
    requestId: "server-request",
    params: {
      entityTypeId: 1,
      fields: {
        "title": "Новая заявка с сайта fidelis-group.ru",
        "name": name,
        "fm": [
          {
            "valueType": "WORK",
            "value": phone,
            "typeId": "PHONE"
          },
          {
            "valueType": "WORK",
            "value": email,
            "typeId": "EMAIL"
          }
        ],
        "sourceID": "WEB",
        "sourceDescription": "fidelis-group.ru",
        "utmSource": "Yandex",
        "utmMedium": "CPC",
        "utmCampaign": "2026",
        "utmContent": "Landing",
        "utmTerm": "Test"
      }
    }
  })
  res.send("Req is sended");

})

app.listen(process.env.BACKEND_SERVER_PORT, () => {
  console.log("Hello from theneyre :3")
})  