import express from 'express';
import {signup, login, logout, onboard} from "../controllers/auth.controllers.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout); // we use post as it basically update the seesion by dstroying the cookie on the server side

router.post("/onboarding", protectRoute, onboard);

// check user is logged in or not
router.get("/me", protectRoute, (req, res)=> {
    res.status(200).json({success:true, user:req.user});
})

export default router;