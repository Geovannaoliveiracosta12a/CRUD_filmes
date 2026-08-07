import express from 'express';
import mysql from 'mysql2';

const app = express();
app.use(express.json());

const sql = mysql.createPool({
    host: "benserverplex.ddns.net",
    database: "alunos_filmes03TA",
    user: "alunos",
    password: "senhaAlunos"
})

app.get("/", (request, response) =>{
    response.json({
        message: "servidor rodando projeto filmes"
    })
})

app.post("/create-filmes", (request, response) => {
    const { title, genre, duration, age_rating } = request.body

    const insertCommand = "INSERT INTO filmes_GeovannaOliveira (title, genre, duration, age_rating) VALUES (?, ?, ?, ?)"

    sql.query(insertCommand, [title, genre, duration, age_rating], (error) => {
        if(error){
            console.log(error)
            return
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})