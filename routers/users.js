import { Router } from "express";
import isSignedIn from "../middleware/isSignedIn.js";
import * as controllers from "../controllers/auth.js";

const router = Router();

router.get("/signUp", controllers.getSignUp)
router.post("/signUp", controllers.registerUser)
router.get("/login", controllers.getLogin )
router.post("/login",controllers.loginUser)
router.get("/sign-out", controllers.signOutUser);
router.get("/animesList", isSignedIn, controllers.animesPage )
router.get("/animesList/addAnime", isSignedIn, controllers.addAnimePage)
router.post("/animesList/addAnime", isSignedIn, controllers.addAnime)
router.get("/animesList/:id", isSignedIn, controllers.showAnime)
export default router;