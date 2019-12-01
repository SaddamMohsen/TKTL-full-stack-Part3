const mongoose = require('mongoose')
const url=process.env.MONGODB_URI;

console.log('connecting to',url)
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(result => {   
          console.log('connected to MongoDB')})
		  .catch((error) => {   
  		     console.log('error connecting to MongoDB:', error.message) 
			 }) 
const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})
personSchema.set('toJSON',{
	    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//const Person = mongoose.model('Person', personSchema)

module.exports =mongoose.model('Person',personSchema)
/* const pers = new Person({
  name: name,
  number: number,
})

pers.save().then(response => {
  console.log('person saved!')
  mongoose.connection.close()
})

Person.find({}).then(persons=>{
	       persons.forEach(per=>{
		       console.log(per)
			   })
		mongoose.connection.close()
}) */