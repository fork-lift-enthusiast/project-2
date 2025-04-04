import { Router } from "express";
// import isSignedIn from "../middleware/is-signed-in.js";
import * as controllers from "../controllers/auth.js";

const router = Router();

router.get("/signUp", controllers.getSignUp)
router.post("/signUp", controllers.registerUser)
router.get("/login", controllers.getLogin )
router.post("/login",controllers.loginUser)
router.get("/sign-out", controllers.signOutUser);
router.get("/animesList",controllers.animesPage )
router.get("/animesList/addAnime",controllers.addAnimePage)
router.post("/animesList/addAnime",controllers.addAnime)
export default router;