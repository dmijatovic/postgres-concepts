const express = require('express')
const app = express()

const pgdb = require('./pgdb')
const returnError = require("./utils/returnError")
const returnData = require("./utils/returnData")
const PORT = 8080

//middleware to get json body
app.use(express.json())

//ROUTES

app.get("/",(req,res)=>{
  res.send(`
    <h1>NodeJS and PostgreSQL ToDo app</h1>
    <p>This app will make you laugh :-)</p>
  `)
})

//create todo
app.post("/todo",(req,res)=>{
  const {description} = req.body
  if (description){
    pgdb.query("INSERT INTO todo (description) VALUES($1) RETURNING *;",[description])
    .then(resp=>{
      // console.log("Postgre...", resp)
      res.status(200)
      .json(returnData(resp))
    })
    .catch(e=>{
      res.status(500)
      .json(returnError(e))
    })
  } else {
    res.status(400)
    .json({
      message:"Missing description property!"
    })
  }
})

app.put("/todo",(req,res)=>{
  const {id,description} = req.body
  pgdb.query("UPDATE todo SET DESCRIPTION=($1) WHERE id=$2 RETURNING *",[description, id])
    .then(resp=>{
      // console.log("resp...", resp)
      const {rowCount} = resp
      if (rowCount===0){
        res.status(400)
          .json(returnError({
            message: `There is no todo with id ${id}`
          }, 400))
      }else {
        res.status(200)
          .json(returnData(resp))
      }
    })
    .catch(e=>{
      res.status(500)
        .json(returnError(e))
    })
})

app.get("/todo/:id",(req,res)=>{
  const {id} = req.params
  if (!id) {
    res.status(400)
      .json(returnError({
        message:'Id param not provided'
      },400))
  }else{
    pgdb.query("SELECT * FROM todo WHERE id=$1",[id])
    .then(resp=>{
      res.status(200)
        .json(returnData(resp))
    })
    .catch(e=>{
      res.status(500)
        .json(returnError(e))
    })
  }
})

app.delete("/todo/:id",(req,res)=>{
  const {id} = req.params
  if (!id) {
    res.status(400)
      .json(returnError({
        message:'Id param not provided'
      },400))
  }else{
    pgdb.query("DELETE FROM todo WHERE id=$1",[id])
    .then(resp=>{
      res.status(200)
        .json(returnData(resp))
    })
    .catch(e=>{
      res.status(500)
        .json(returnError(e))
    })
  }
})

app.get("/todos",(req,res)=>{
  pgdb.query("SELECT * FROM todo")
  .then(resp=>{
    res.status(200)
      .json(returnData(resp))
  })
  .catch(e=>{
    res.status(500)
      .json(returnError(e))
  })
})

app.listen(PORT,()=>{
  console.log(`Express server on ${PORT}`)
})