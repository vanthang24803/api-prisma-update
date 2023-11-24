import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.status(200).json(allUsers);
};

export const signIn = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    const { username, password, firstName, lastName, age, address, isAdmin } =
      req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        firstName,
        lastName,
        age,
        address,
        isAdmin,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, age, address, isAdmin } = req.body;
  const id = req.params.id;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      !firstName &&
      !lastName &&
      age === undefined &&
      !address &&
      isAdmin === undefined
    ) {
      return res
        .status(400)
        .json({ error: "No valid data provided for update" });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        age,
        address,
        isAdmin,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { username } = req.params;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = bcrypt.compareSync(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Old password is incorrect" });
    }

    const handleNewPassword = bcrypt.hashSync(
      newPassword,
      bcrypt.genSaltSync(10)
    );

    const updateUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        password: handleNewPassword,
      },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error updating password:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
