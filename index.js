const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: '50.116.112.109',
    user: 'advpin91_wp447',
    password: '08121520',
    database: 'advpin91_testevotacao'
});

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}))



app.get('/api/get/votos', (req, res) =>  {
    const sqlSelect = "SELECT * FROM Votos"
    db.query(sqlSelect, (err, result ) =>  {
       res.send(result);
     })
})

app.get('/api/get/lula', (req, res) =>  {
    const sqlSelect = "SELECT * FROM lula"
    db.query(sqlSelect, (err, result ) =>  {
       res.send(result);
     })
})

app.get('/api/get/bolsonaro', (req, res) =>  {
    const sqlSelect = "SELECT * FROM bolsonaro"
    db.query(sqlSelect, (err, result ) =>  {
       res.send(result);
     })
})


app.post('/api/insert/lula', (req, res) =>  {
    const lula = req.body.lula
    const ip = req.body.ip
    const lat = req.body.lat
    const lng = req.body.lng

    
    const sqlInsert = "INSERT INTO lula (voto, ip, lat, lng ) VALUES (? , ? , ?, ?)"
    db.query(sqlInsert, [lula, ip, lat, lng ], (err, result ) =>  {
        if (err) {
            res.send(err)
            console.log(err)
        }else {
            res.send(result)
            console.log(result)
        }
     })
     return res
});

app.post('/api/insert/bolsonaro', (req, res) =>  {
    const bolsonaro = req.body.bolsonaro
    const ip = req.body.ip
    const lat = req.body.lat
    const lng = req.body.lng

    
    const sqlInsert = "INSERT INTO bolsonaro (voto, ip, lat, lng ) VALUES (? , ?, ? , ?)"
    db.query(sqlInsert, [bolsonaro, ip, lat, lng ], (err, result ) =>  {
        if (err) {
            res.send(err)
            console.log(err)
        }else {
            res.send(result)
            console.log(result)
        }
     })

     return res
});


app.get('/', (req, res) =>  {
    res.send("Iniciado");
})



app.listen(3000, () => {
    console.log('Running on port 3000');
    
});
