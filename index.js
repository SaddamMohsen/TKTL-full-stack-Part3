const express=require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


app.use(cors())
app.use(express.static('build'))
let persons=[
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

const generateId = () => {
	
  let maxId = 0;
     maxId=Math.floor((Math.random()*99)+1)
  let person=persons.find(per=>per.id===maxId)
 
  if(person)
    return generateId()
  else
	  return maxId
}
app.post('/api/person',(req,res) => {
       const body=req.body
    if(!body.number||!body.name)
    {
           return res.status(400).json({ 
      error: 'name or number missing'
    })}
    let name=String(req.body.name)
    
    const isPers=persons.find(pers=>pers.name===name)
     if(isPers)
     {
       return res.status(400).json({ 
      error: 'name must be unique' 
    })}
    const pers={
      name:body.name,
      number:body.number,
      id:generateId()
    }
    persons=persons.concat(pers)
     res.json(pers)
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})