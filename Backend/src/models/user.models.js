import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim : true
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase : true,
    trim : true
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  }
}, { timestamps: true })


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}


export const UserModel = mongoose.model('User', userSchema);