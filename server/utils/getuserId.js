import jwt from 'jsonwebtoken';
const getuserId = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET,  (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return (data.id);
        }
      });
}

export default getuserId;