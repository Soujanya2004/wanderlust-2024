
module.exports.contactPage =  (req, res) => {
	try {
		res.render("contact");
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
}; 

//About us page
module.exports.aboutPage = async (req, res) => {
  try {
    res.render('about');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Terms and conditions page
module.exports.termsPage = async (req, res) => {
  try {
    res.render('terms');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Privacy policy page
module.exports.privacyPage = async (req, res) => {
  try {
    res.render('privacy');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// CONTRIBUTORS
module.exports.contributors = async (req, res) => {
  try {
    res.render("contributors.ejs");
  } catch (err) {
    console.error("Error fetching contributors:", err);
    req.flash("error", err);
    return res.redirect("/listing");
  }
};