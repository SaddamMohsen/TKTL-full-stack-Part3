const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
//const url=process.env.MONGODB_URI;
const url='mongodb+srv://saddam:saddam:wmgkosdj!#Sad1990@ascapcluster-nhfu8.mongodb.net/test?retryWrites=true&w=majority'
mongoose.set('useFindAndModify', false)
console.log('connecting to',url)
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(result => {   
          console.log('connected to MongoDB')})
		  .catch((error) => {   
  		     console.log('error connecting to MongoDB:', error.message)
			 }) 
const personSchema = new mongoose.Schema({
  name:{
   type:String,
  minlength:3,
  required:true,
  unique:true
  },
  number:{
    type:Number,
	minlength:8,
	required:true
  }
})
// Apply the uniqueValidator plugin to userSchema.
personSchema.plugin(uniqueValidator);

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
