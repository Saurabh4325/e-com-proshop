import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@proshop.com",
    password: bcrypt.hashSync("12345"),
    isAdmin: true,
  },
  {
    name: "Sachin Sharma",
    email: "sachin123@proshop.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Kapil Garg",
    email: "kapil123@proshop.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Amit hodkasia",
    email: "amit123@proshop.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Adita Raj",
    email: "aditya123@proshop.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

export default users;
