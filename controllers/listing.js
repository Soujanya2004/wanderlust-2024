const listing = require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: maptoken });
const cloudinary = require('cloudinary').v2;

module.exports.index = async (req, res) => {
  try {
      const listings = await listing.find();
      console.log("Listings fetched:", listings);
      res.render("index.ejs", { listings });
  } catch (err) {
      console.error("Error fetching listings:", err);
      req.flash("error", "Failed to fetch listings. Please try again later.");
      return res.redirect("/");
  }
};

module.exports.newpost = async (req, res) => {
    console.log(req.user);
    res.render("new.ejs");
}; 

module.exports.search = async (req, res) => {
    const { query } = req.body;
    if (query && query.trim()) {
      const regex = new RegExp(query.trim(), 'i'); // Case-insensitive search
      const searchQuery = {
        $or: [{ country: regex }, { title: regex }],
      };
      const results = await listing.find(searchQuery);
      if(results.length===0){
        req.flash("error","No listing found");
        return res.redirect("/listing");
      }
      res.render("search.ejs",{results})
    } else {
      req.flash("error","Error found");
    }
  };

module.exports.createpost = async (req, res) => {
  try {
      // Validate that listing data exists
      if (!req.body.listing) {
          return res.status(404).send("Enter valid listing details");
      }

      const { title, description, price, country, location } = req.body.listing;

      // Geocoding to get coordinates from location
      const geoData = await geocodingClient.forwardGeocode({
          query: location,
          limit: 1
      }).send();

      const newListing = new listing({
          title,
          description,
          price,
          country,
          location,
          geometry: geoData.body.features[0].geometry,
          owner: req.user._id,
          image: []
      });

      // Handle multiple image uploads from Cloudinary
      if (req.files) {
          req.files.forEach(file => {
              newListing.image.push({
                  url: file.path,
                  filename: file.filename
              });
          });
      }

      // Save the listing to the database
      await newListing.save();

      req.flash("success", "New listing created successfully");
      return res.redirect("/listing");

  } catch (err) {
      console.error(err);
      req.flash("error", "Failed to create listing");
      return res.redirect("/listing/new");
  }
};


module.exports.editpost = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await listing.findById(id);
        if (!list) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }
        res.render("edit.ejs", { list });
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to load edit page");
        return res.redirect("/listing");
    }
};

module.exports.showPost = async (req, res) => {
  try {
      const { id } = req.params;
      const list = await listing.findById(id)
          .populate({
              path: 'reviews',
              populate: {
                  path: 'author'
              }
          })
          .populate('owner');

      console.log(list);

      if (!list) {
          req.flash('error', 'Listing not found');
          return res.redirect('/listing');
      }

      res.render('show.ejs', { list });
  } catch (err) {
      console.error("Error fetching listing:", err);
      req.flash("error", "Failed to load listing details");
      return res.redirect("/listing");
  }
};

module.exports.saveEditpost = async (req, res) => {
  const { id } = req.params;

  try {
      if (!req.body.listing) {
          req.flash('error', 'Send valid data of listing');
          return res.redirect(`/listing/${id}`);
      }

      let editList = await listing.findById(id);

      if (req.files && req.files.length > 0) {
          editList.image = [];

          req.files.forEach(file => {
              // Upload to Cloudinary and get the URL
              editList.image.push({
                  url: file.path,
                  filename: file.filename
              });
          });
      }

      // Update other fields
      editList.title = req.body.listing.title;
      editList.description = req.body.listing.description;
      editList.price = req.body.listing.price;
      editList.location = req.body.listing.location;
      editList.country = req.body.listing.country;

      await editList.save();

      req.flash('success', 'Listing updated successfully');
      return res.redirect(`/listing/${id}`);

  } catch (err) {
      console.error(err);
      req.flash("error", "Failed to update listing");
      return res.redirect(`/listing/${id}/edit`);
  }
};


module.exports.deletepost = async (req, res) => {
    const { id } = req.params;
    try {
        await listing.findByIdAndDelete(id); // Deconstructing parameters
        req.flash("success", "Listing deleted successfully");
    } catch (err) {
        console.error(err);
        req.flash("error", "Failed to delete listing");
    }
    res.redirect("/listing");
};
