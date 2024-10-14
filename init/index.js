const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

main()
.then(() => {
  initdb();
    console.log("database connected**");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initdb = async () =>{
   await listing.deleteMany({});
   initdata.data=initdata.data.map((obj) =>({...obj,owner:"66a8a991a9c26239684f9b7a"}));
   await listing.insertMany(initdata.data);  //initdata is object
   console.log("data was initialised");
};



