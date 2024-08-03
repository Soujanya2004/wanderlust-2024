module.exports= (fn) =>{
   return function(req,res,next) {
    fn(req,res,next).catch(next); //calls next error handling route
   }; 
};


//to handel errors using async wrap method