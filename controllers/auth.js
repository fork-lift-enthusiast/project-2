import User from "../models/user.js";
import bcrypt from "bcrypt";
import Anime from "../models/anime.js";

export const getLogin = (req, res) => {
  res.render("auth/login");
};
export const getSignUp = (req, res) => {
  res.render("auth/signUp");
};

export const loginUser = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  req.session.user = {
    _id: userInDatabase._id,
    username: userInDatabase.username,
  };

  req.session.save(() => {
    res.redirect("/");
  });
};

export const registerUser = async (req, res) => {
  // Check if password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  // Check if username already in database
  const userInDB = await User.findOne({ username: req.body.username });
  if (userInDB) {
    return res.send("Username already taken.");
  }

  // Hash our plain-text password before saving to DB (for security)
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });
  req.session.user = {
    _id: user._id,
    username: user.username,
  };

  req.session.save(() => {
    res.redirect("/");
  });
};

export const signOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const animesPage = async (req, res) => {
  const animeList = await Anime.find({ user_id: req.session.user._id });
  res.render("auth/animesList", { animeList });
};

export const addAnimePage = (req, res) => {
  res.render("auth/addAnime");
};

export const addAnime = async (req, res) => {
  try {
    const anime = await Anime.create({
      name: req.body.name,
      rating: req.body.rating,
      image: req.body.image,
      description: req.body.description,
      user_id: req.session.user._id,
    });

    req.session.save(() => {
      res.redirect("/auth/animesList");
    });
  } catch (error) {
    console.error("Error Adding Anime", error);
    res.status(500).send("Server error");
  }
};

export const showAnime = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.render("auth/animeDetails", { anime });
  } catch (error) {
    console.error(error);
    res.send("There was an error");
  }
};

export const editAnimeForm = async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).send("Anime not found");
    }
    res.render("auth/editAnime", { anime, user: req.session.user });
  } catch (error) {
    console.error("Error fetching anime for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateAnime = async (req, res) => {
  try {
    const updatedAnime = await Anime.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        rating: req.body.rating,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true, runValidators: true } // Return the updated document and run validations
    );
    if (!updatedAnime) {
      return res.status(404).send("Anime not found");
    }
    // After updating, redirect to the updated anime's detail page
    res.redirect("/auth/animesList/" + req.params.id);
  } catch (error) {
    console.error("Error updating anime:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteAnime = async (req, res) => {
    try {
      await Anime.findByIdAndDelete(req.params.id);
      // Redirect back to the list after successful deletion
      res.redirect("/auth/animesList");
    } catch (error) {
      console.error("Error deleting anime:", error);
      res.status(500).send("Internal Server Error");
    }
  };