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
        // console.log("Listings fetched:", listings);
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
            return res.status(404).send(ERROR_SEND_VALID_DATA);
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

        req.flash("success", SUCCESS_LISTING_CREATED);
        return res.redirect("/listing");

    } catch (err) {
        console.error(err);
        req.flash("error", ERROR_CREATE_LISTING);
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

        if (!list) {
            req.flash('error', ERROR_LISTING_NOT_FOUND);
            return res.redirect('/listing');
        }
        res.render('show.ejs', { list });
    } catch (err) {
        console.error("Error fetching listing:", err.message);
        console.error("Stack trace:", err.stack);
        req.flash("error", ERROR_LOAD_LISTING_DETAILS);
        return res.redirect("/listing");
    }
};


module.exports.saveEditpost = async (req, res) => {
    const { id } = req.params;
    console.log("saveditpost");
    try {
        if (!req.body.listing) {
            req.flash('error', ERROR_SEND_VALID_DATA);
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

        req.flash('success', SUCCESS_LISTING_UPDATED);
        return res.redirect(`/listing/${id}`);

    } catch (err) {
        console.error(err);
        req.flash("error", ERROR_UPDATE_LISTING);
        return res.redirect(`/listing/${id}/edit`);
    }
};


module.exports.deletepost = async (req, res) => {
    console.log("Deleting listing with ID:", req.params.id);
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
