const express = require('express');

const dotenv = require("dotenv").config();

const connectDB = require("./connect/database");

connectDB();

port = process.env.PORT;

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    req.aluno = { id: 1 }; 
    next();
  });

  const simularLogin = (req, res, next) => {
    req.professorId = '66bd020d01ce226002aac255'; 

    next();
  };

  app.use(simularLogin);

app.use('/api',require('./routes/avaliacao-route'));

app.use('/api',require('./routes/aluno-route'));

app.use('/api',require('./routes/nota-route'));

app.use('/api',require('./routes/professor-route'));

app.use('/api',require('./routes/turma-route'));

app.use('/api',require('./routes/classe-route'));

app.use('/api',require('./routes/disciplina-route'));




app.listen(port,() => console.log(`Listening on http://localhost:${port}`));