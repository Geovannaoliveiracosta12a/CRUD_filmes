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

app.get("/todos-filmes", (request, response) =>{
    const selectCommand = "SELECT * FROM filmes_GeovannaOliveira"

    sql.query(selectCommand, (error, data) => {
        if(error){
            console.log(error)
            return
        }
        response.json(data)
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

app.delete("/delete-filmes/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_GeovannaOliveira WHERE id = ?"

    sql.query(deleteCommand, [id], (error) => {
        if(error){
            console.log(error)
            return
        }

        response.status(200).json({
            message: "Filme deletado com sucesso!"
        })
    });
});

// atualizar tarefas
app.put("/update-filmes/:id", (request, response) => {

    const { id } = request.params;
    const { title, genre, duration, age_rating } = request.body;

    const updateCommand = `
        UPDATE filmes_GeovannaOliveira
        SET
            title = ?,
            genre = ?,
            duration = ?,
            age_rating = ?
        WHERE id = ?
    `;

    sql.query(
        updateCommand,
        [title, genre, duration, age_rating, id],
        (error) => {

            if (error) {
                console.log(error);
                return;
            }

            response.json({
                message: "Informações atualizadas com sucesso!"
            });

        }
    );

});
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})