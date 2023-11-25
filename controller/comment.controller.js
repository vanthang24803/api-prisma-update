import prisma from "../lib/prisma.js";

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;

  const { title } = req.body;

  try {
    const exitingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!exitingPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const newComment = await prisma.comment.create({
      data: {
        title,
        authorId: id,
        postId: postId,
      },
    });

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const getAllComment = async (req, res) => {
  const { postId } = req.params;
  try {
    const exitingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!exitingPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const allComments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    res.status(200).json(allComments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { title } = req.body;

  try {
    const exitingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!exitingPost) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const exitingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!exitingComment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    const updateComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        title,
      },
    });

    res.status(200).json(updateComment);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    }

    const exitingComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!exitingComment) {
      res.status(404).json({ message: "Comment not found!" });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          decrement: 1,
        },
      },
    });

    res.status(200).json("Delete comment successfully!");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
