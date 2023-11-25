import prisma from "../lib/prisma.js";

export const createPost = async (req, res) => {
  const { title, content, image } = req.body;
  const authorId = req.user.id;

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId: authorId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        image,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: "Post delete successfuly!" });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
