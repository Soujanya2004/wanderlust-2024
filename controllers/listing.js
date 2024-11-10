const listing = require("../models/listing.js");
const Review = require('../models/reviews.js');
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
        const { tag } = req.query;
        // console.log(tag);
        let listings;

        // Check if tag is present in query
        if (tag) {
            // Search for listings where the tags array contains the selected tag
            listings = await listing.find({ tags: { $in: [tag] } });
            
            // If no listings are found for the tag, flash a message
            if (listings.length === 0) {
                req.flash('error', `No listings found for the tag "${tag}".`);
                return res.redirect("/listing");
            }
            
            // console.log(listings);
        } else {
            // If no tag is selected, return all listings
            listings = await listing.find({});
        }

        // Render the listings page and pass the listings and tag data
        res.render("index.ejs", { listings, tag });

    } catch (err) {
        console.error("Error fetching listings:", err);
        req.flash("error", "Error fetching listings");
        return res.redirect("/");  // Redirect to the homepage on error
    }
};


//bug fixes
module.exports.newpost = async (req, res) => {
    const tags = ["Trending", "Surfing", "Amazing cities", "Beach", "Farms", "Lake", "Castles", "Rooms", "Forest", "Pool"];
    try {
        console.log("Rendering new listing form...");
        res.render("new.ejs", { tags });
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

        // Destructure the properties from req.body.listing, including tags
        const { title, description, price, country, location, tags } = req.body.listing;

        //Description limit
        if(description.length > 1000){
            req.flash("error", "Maximum 1000 charecters allowed!");
            return res.redirect("/listing/new");
        }

        // Ensure tags is an array (if it's a comma-separated string, split it)
        let tagArray = [];
        if (tags) {
            if (Array.isArray(tags)) {
                // If tags is already an array, use it directly
                tagArray = tags.map(tag => tag.trim());
            } else if (typeof tags === 'string') {
                // If tags is a string, split it by commas
                tagArray = tags.split(',').map(tag => tag.trim());
            }
        }

        // Allowed to add only 3 tage maximum!
        if(tagArray.length > 3){
            req.flash("error", "Maximum 3 tags are allowed!");
            return res.redirect("/listing/new");
        }
        
        // Geocoding to get coordinates from location
        const geoData = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1
        }).send();

        // Create the new listing with tags
        const newListing = new listing({
            title,
            description,
            price,
            country,
            location,
            geometry: geoData.body.features[0].geometry,
            owner: req.user._id,
            image: [],  // Initialize as an empty array
            tags: tagArray // Save the tags (either empty array or the parsed tags)
        });

        // Handle file uploads
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
        console.log(newListing);

        req.flash("success", "Listing successfully created!");
        return res.redirect("/listing");

    } catch (err) {
        console.error("Error creating listing:", err);
        req.flash("error", "An error occurred while creating the listing.");
        return res.redirect("/listing/new");
    }
};


module.exports.bookinfFt = async (req, res) => {
    // Fetch the list from the database using the ID from the URL
    const listingId = req.params.id;
  
    // Assuming you have a `Listing` model, fetch the list from the database
      const list = await listing.findById(req.params.id);
      if (!list){
        return res.status(404).send("Listing not found");
      }
  
        // Pass the list object to the EJS view
        res.render('booking', { list: list });
    };


module.exports.editpost = async (req, res) => {
    const tags = ["Trending", "Surfing", "Amazing cities", "Beach", "Farms", "Lake", "Castles", "Rooms", "Forest", "Pool"];
    try {
        const { id } = req.params;
        const list = await listing.findById(id);
        if (!list) {
            req.flash('error', ERROR_LISTING_NOT_FOUND);
            return res.redirect('/listing');
        }
        res.render("edit.ejs", { list, tags });
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

            // Destroyer for delete image from cloude storage.
            for (const filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename); // Delete from Cloudinary
            }

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
        
        // Update tags (parse as an array from a comma-separated string)
        const tags = req.body.listing.tags;
        let tagArray = [];
        if (tags) {
            if (Array.isArray(tags)) {
                tagArray = tags.map(tag => tag.trim());
            } else if (typeof tags === 'string') {
                tagArray = tags.split(',').map(tag => tag.trim());
            }
        }

        // Allowed to add only 3 tage maximum!
        if(tagArray.length > 3){
            req.flash("error", "Maximum 3 tags are allowed!");
            return res.redirect(`/listing/${id}/edit`);
        }

      // Update other fields
        editList.title = req.body.listing.title;
        editList.description = req.body.listing.description;
        editList.genre = req.body.listing.genre;
        editList.price = req.body.listing.price;
        editList.location = location; // Pass new location
        editList.country = req.body.listing.country;
        editList.geometry = updatedGeometry; // Save the GeoJSON object in geometry
        // tags
        editList.tags = tagArray; // Save the updated tags
        
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

module.exports.likeListing = async (req, res) => {
    const { id } = req.params;
    try {
        const foundListing = await listing.findById(id);
        if (!foundListing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }
        const userId = req.user._id; 
        const hasLiked = foundListing.likedBy.includes(userId);

        if (hasLiked) {
            foundListing.likes -= 1;
            foundListing.likedBy.pull(userId);
        } else {
            foundListing.likes += 1;
            foundListing.likedBy.push(userId);
        }

        await foundListing.save();
        req.flash('success', hasLiked ? 'Like removed!' : 'Listing liked successfully!');
        return res.redirect(`/listing/${id}`);
    } catch (err) {
        console.error("Error liking/disliking listing:", err);
        req.flash('error', 'An error occurred while liking/disliking the listing.');
        return res.redirect(`/listing/${id}`);
    }
};

module.exports.topListings = async (req, res) => {
    try {
        // Fetch all listings
        const listings = await listing.find().populate('reviews');

        // Filter listings with an average rating of 4 or more
        const topRatedListings = listings.filter(listing => {
            if (listing.reviews.length === 0) return false; // Skip listings with no reviews
            const avgRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0) / listing.reviews.length;
            return avgRating >= 4; // Include only those with avg rating >= 4
        });

        res.render("top_listing_page.ejs", { listings: topRatedListings });
    } catch (err) {
        console.error("Error fetching top listings:", err);
        req.flash("error", "Could not load top listings.");
        return res.redirect("/");
    }
};

