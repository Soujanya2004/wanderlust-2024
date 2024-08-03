const listing=require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const maptoken=process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: maptoken }); //start geocoding with the token


module.exports.index=(async (req,res) =>{
    const Listing = await listing.find();
    res.render("index.ejs",{Listing});   //display all listing
     });
module.exports.newpost=((req, res) => {
        console.log(req.user);//to display user credential
        res.render("new.ejs");
    }); 
module.exports.createpost=(async (req,res,next) =>{
 
        if(!req.body.listing){
          res.status(404).send("enter valid listing");
        }
        const newlisting= new listing(req.body.listing); 
        if(!newlisting.title){
          res.status(404).send("enter listing title");
        }
        if(!newlisting.description){
          res.status(404).send("enter listing description");
        }
        if(!newlisting.location){
          res.status(404).send("enter listing location");
        }
        if(!newlisting.country){
          res.status(404).send("enter listing country");
        }
        if(!newlisting.price){
          res.status(404).send("enter listing price");
        }
        let response=await geocodingClient.forwardGeocode({
          query: req.body.listing.location,
          limit: 1      //from geocoding doc, which gives co-ordinates of any place
        })
        .send()
        
        //inserting data entered to list
        let url=req.file.path;
        let filename=req.file.filename;
        newlisting.owner=req.user._id;
        newlisting.image={url,filename};

        newlisting.geometry=response.body.features[0].geometry;
         //to set coordinates into listing geometry 
        let saveListing= await newlisting.save();
        console.log(saveListing);
        req.flash("sucess","New listing created");
        res.redirect("/listing"); 
    });
    module.exports.editpost=(async (req,res) =>{
      let { id } = req.params;
        const list =await listing.findById(id);
        res.render("edit.ejs",{list});
      });
      module.exports.showPost =(async (req, res) => {
        const { id } = req.params;
        const list = await listing.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('owner');
    
        if (!list) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }
    
        res.render('show.ejs', { list });
    });
    
      module.exports.saveEditpost=(async (req, res) => {
        if (!req.body.listing) {
          req.flash('error', 'Send valid data of listing');
          return res.redirect(`/listing/${id}`);
        }
        
        let {id} =req.params;        
        let editList=await listing.findByIdAndUpdate(id, { ...req.body.listing });

        if(typeof req.file !== "undefined") { //check if new image is requested
          let url=req.file.path;
          let filename=req.file.filename;   
          editList.image = {url,filename};
          await editList.save(); //save image url again
        }
        
        req.flash('success', 'Listing updated successfully');
        res.redirect(`/listing/${id}`);
      });
      module.exports.deletepost=(async (req,res) =>{
    
        let {id} =req.params;
        await listing.findByIdAndDelete(id); //deconstructing parameters
        res.redirect("/listing");
      });
      
    
    