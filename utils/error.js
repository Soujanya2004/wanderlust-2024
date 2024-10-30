module.exports= (fn) =>{
   return function(req,res,next) {
      Promise.resolve(fn(req,res,next)).catch(next); //calls next error handling route
   }; 
};


//to handel errors using async wrap method