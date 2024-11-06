const listing = require("../models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: maptoken });
const cloudinary = require('cloudinary').v2;
const {
    ERROR_FETCH_LISTINGS,
    ERROR_CREATE_LISTING,
    ERROR_LOAD_EDIT_PAGE,
    ERROR_LOAD_LISTING_DETAILS,
    ERROR_UPDATE_LISTING,
    ERROR_DELETE_LISTING,
    ERROR_LISTING_NOT_FOUND,
    ERROR_SEND_VALID_DATA,
    SUCCESS_LISTING_CREATED,
    SUCCESS_LISTING_UPDATED,
    SUCCESS_LISTING_DELETED,
} = require('../constants.js');

module.exports.index = async (req, res) => {
    try {
        const listings = await listing.find();
        // console.log("Listings fetched:", listings[0].image);
        res.render("index.ejs", { listings });
    } catch (err) {
        console.error("Error fetching listings:", err);
        req.flash("error", ERROR_FETCH_LISTINGS);
        return res.redirect("/");
    }
};

//bug fixes
module.exports.newpost = async (req, res) => {
    try {
        console.log("Rendering new listing form...");
        res.render("new.ejs");
    } catch (err) {
        console.error("Error loading new listing form:", err);
        req.flash("error", "Error loading form.");
        return res.redirect("/listing");
    }
};


module.exports.search = async (req, res) => {
    const { query } = req.body;
    if(query.length === 0){
        req.flash("error","Please enter something in search box for searching.");
        return res.redirect("/listing");
    }
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
        if (!req.body.listing) {
            req.flash("error", "Please provide valid listing data.");
            return res.status(404).send("Please provide valid listing data.");
        }

        const { title, description, price, country, location } = req.body.listing;

        // Geocoding to get coordinates from location
        const geoData = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1
        }).send();

        // Create the new listing
        const newListing = new listing({
            title,
            description,
            price,
            country,
            location,
            geometry: geoData.body.features[0].geometry,
            owner: req.user._id,
            image: []  // Initialize as an empty array
        });

        // console.log('Files received:', req.files);

        // Map uploaded files to image data
        if (req.files) {
            req.files.forEach(file => {
                newListing.image.push({
                        url: file.path,
                        filename: file.filename // Adjust based on where images are stored
                });
            });
        }

        // Save the listing to the database
        await newListing.save();
        // console.log(newListing);

        req.flash("success", "Listing successfully created!");
        return res.redirect("/listing");

    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "An error occurred while creating the listing.");
        return res.redirect("/listing/new");
    }
};




module.exports.editpost = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await listing.findById(id);
        if (!list) {
            req.flash('error', ERROR_LISTING_NOT_FOUND);
            return res.redirect('/listing');
        }
        res.render("edit.ejs", { list });
    } catch (err) {
        console.error(err);
        req.flash("error", ERROR_LOAD_EDIT_PAGE);
        return res.redirect("/listing");
    }
};

const mongoose = require('mongoose');

module.exports.showPost = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if 'id' is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid listing ID');
            return res.redirect('/listing');
        }

        const list = await listing.findById(id)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            })
            .populate('owner');
        // console.log(list);
        if (!list) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }

        let userHasReviewed = false;
        if (req.user && list.owner) {
            userHasReviewed = list.reviews.some(review => review.author && review.author._id && review.author._id.equals(req.user._id));
        }


        res.render('show.ejs', { list, userHasReviewed });
    } catch (err) {
        console.error("Error fetching listing:", err);
        req.flash("error", "Could not load listing details");
        return res.redirect("/listing");
    }
};



module.exports.saveEditpost = async (req, res) => {
    const { id } = req.params;
    // console.log("saveditpost");
    try {
        if (!req.body.listing) {
            req.flash('error', ERROR_SEND_VALID_DATA);
            return res.redirect(`/listing/${id}`);
        }

        // Extract location
        let location = req.body.listing.location

        // Forword geocodding.using mapbox SDK
        const geoData = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1
        }).send();

        // Extract updated geometry
        let updatedGeometry = geoData.body.features[0].geometry;


        let editList = await listing.findById(id);


        // console.log(req.body.deleteImages);

         // Handle image deletion
         if (req.body.deleteImages && req.body.deleteImages.length > 0) {
            // Filter out images not selected for deletion
            editList.image = editList.image.filter(img => !req.body.deleteImages.includes(img.filename));

        }


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
        editList.location = location; // Pass new location
        editList.country = req.body.listing.country;
        editList.geometry = updatedGeometry; // Save the GeoJSON object in geometry

        await editList.save();

        req.flash('success', SUCCESS_LISTING_UPDATED);
        return res.redirect(`/listing/${id}`);

    } catch (err) {
        console.error(err);
        req.flash("error", ERROR_UPDATE_LISTING);
        return res.redirect(`/listing/${id}/edit`);
    }
};


module.exports.deletepost = async (req, res) => {
    // console.log("Deleting listing with ID:", req.params.id);
    const { id } = req.params;
    try {
        await listing.findByIdAndDelete(id); // Deconstructing parameters
        req.flash("success", SUCCESS_LISTING_DELETED);
    } catch (err) {
        console.error(err);
        req.flash("error", ERROR_DELETE_LISTING);
    }
    res.redirect("/listing");
};


