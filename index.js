const express=require('express')
const app = express()
const bodyParser = require('body-parser')
  var fs = require("fs");
//app.use(bodyParser.json())
const persons=[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Saddam Hussein",
      "number": "77-72-07896",
      "id": 5
    },
    {
      "name": "Ahmed Saleh",
      "number": "22-23-44326",
      "id": 8
    },
    {
      "name": "DanJson",
      "number": "222-33-4323",
      "id": 7
    },
    {
      "name": "Ali Saleh",
      "number": "323-22-48953",
      "id": 10
    },
    {
      "name": "Ahmed Ali",
      "number": "223-456-2134",
      "id": 11
    }
  ]
  


app.get('/info', function (req, res) {
   
      const date=new Date()
      res.end(`Phonebook has info for ${persons.length} people \n ${date}`);
   })




app.get('/', (req, res) => {
  res.send('<h1>Hello World! from backend</h1>')
})

//get all person 
app.get('/api/person',(req,res)=>{
res.json(persons)
})

//get one person by id if it is found
app.get('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  const pers = persons.find(p => p.id === id)
  if (pers) {
    response.json(pers)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/person/:id',(req,res)=>{
  const id =Number(req.params.id)
   persons=persons.filter(per=>per.id !==id)
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})