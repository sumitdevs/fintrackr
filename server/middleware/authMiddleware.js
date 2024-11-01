import User from '../models/User.js';
import jwt from 'jsonwebtoken';


 const userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
        console.log(err);
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.email});
      else return res.json({ status: false });
    }
  });
};

export default userVerification;
