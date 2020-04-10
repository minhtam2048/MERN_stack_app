import { Router } from "express";
const router = Router();
import { url } from "gravatar";
import { genSalt, hash } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { get } from 'config';

import { check, validationResult } from "express-validator";

import User, { findOne } from "../../models/User";

// @route    POST api/users
// @desc     create user/register
// @access   public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await findOne({ email });

      //if user exists

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = url(email, {
        size: "200",
        rating: "pg",
        default: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await genSalt(10);

      user.password = await hash(password, salt);

      await user.save();

      // res.send("User registered");

      // Return json webtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      sign(
        payload,
        get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;
