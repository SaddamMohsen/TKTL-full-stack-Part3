require('dotenv').config()
const express=require('express')
const app = express()
const bodyParser = require('body-parser')

const Person =require('./models/person')
const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(requestLogger)
//var MongoClient = require('mongodb').MongoClient
//var mongoUrl = process.env.MONGODB_URI;

//get number of inputs in database
app.get('/info', function (req, res) {
      const date=new Date()
	   Person.countDocuments({},(error, numOfDocs)=>{
            if (error) throw error;
            count = numOfDocs;
            console.log("count is : " + count);
           res.end(`Phonebook has info for ${count} people \n ${date}`);
          });// end of count   
   })

app.get('/', (req, res) => {
   Person.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()))
  })
  mongoose.connection.close()
})

//get all person 
app.get('/api/person',(req,res)=>{
	Person.find({}).then(persons=>{
		   res.json(persons.map(per=>per.toJSON()))
	})
})

//get one person by id if it is found
app.get('/api/person/:id', (request, response,next) => {
	//console.log(request.params.id)
	Person.findById(request.params.id).then(pers => {
    response.json(pers.toJSON())
	//mongoose.connection.close()
  })
   .catch(err=>{
	    next(err)
   })
}) 

//delete from the phonebook
 app.delete('/api/person/:id',(req,res)=>{
  Person.findByIdAndRemove(req.params.id).then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//post new person into the database
app.post('/api/person',(req,res) => {
       const body=req.body
    if(!body.number||!body.name)
    {
           return res.status(400).json({ 
      error: 'name or number missing'
    })}
  
    const pers=new Person({
      name:body.name,
      number:body.number
    })
	pers.save().then(savedPers=>{
     res.json(savedPers.toJSON())
	})
})

//updated number
app.put('/api/person/:id',(req,res,next)=>{
	const body=req.body;
	const per={
		name :body.name,
	number:body.number
	}
	Person.findByIdAndUpdate(req.params.id,per,{new:true})
	     .then(updateper=>{ 
		 
		 res.json(updateper.toJSON())
		 })
		  .catch(err=>next(err))
	})
	//Handler for unknownEndpoint get
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//middleware to handling error
const errorHandler=(error,request,response,next)=>{
	console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})