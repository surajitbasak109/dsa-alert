import { Post } from '@prisma/client';
import { difficultyText } from '@utilities/text';
import db from 'src/utilities/db';

export type PostParam = Omit<Post, 'id'>;

export async function getAllPosts() {
  const posts = await db.post.findMany({
    include: {
      tags: {
        select: {
          tags: {
            select: {
              name: true
            }
          }
        }
      },
      platform: {
        select: {
          name: true
        }
      }
    }
  });
  return posts.map((post) => {
    return {
      ...post,
      platform: post.platform.name,
      difficulty: difficultyText(post.difficulty),
      tags: post.tags.map((tag) => tag.tags.name)
    };
  });
}

export async function createPost(post: PostParam, tags: number[]) {
  const newData = await db.post.create({
    data: {
      ...post,
      tags: {
        create: tags.map((tag) => {
          return {
            assignedBy: 'Surajit',
            tags: {
              connect: {
                id: tag
              }
            }
          };
        })
      }
    }
  });
  return newData;
}

export async function updatePost(id: number, post: PostParam, tags: number[]) {
  const existingPost = await db.post.findFirst({
    where: {
      id
    }
  });

  if (!existingPost) {
    throw new Error('Post does not exist');
  }

  await db.tagsOnPosts.deleteMany({
    where: {
      postId: id
    }
  });

  const updatedData = await db.post.update({
    where: {
      id
    },
    data: {
      ...post,
      tags: {
        create: tags.map((tag) => {
          return {
            tags: {
              connect: {
                id: tag
              }
            }
          };
        })
      }
    }
  });

  return updatedData;
}

export async function deletePost(id: number) {
  const post = await db.post.findFirst({ where: { id } });
  if (!post) {
    throw new Error('Post not found');
  }
  await db.tagsOnPosts.deleteMany({
    where: {
      postId: id
    }
  });
  const deletedPost = await db.post.delete({
    where: {
      id
    }
  });
  return deletedPost;
}

export async function getPost(id: number) {
  const post = await db.post.findFirst({
    where: { id },
    include: {
      tags: {
        select: {
          tags: {
            select: {
              name: true
            }
          }
        }
      },
      platform: {
        select: {
          name: true
        }
      }
    }
  });
  if (!post) {
    throw new Error('Post not found');
  }
  return {
    ...post,
    platform: post.platform.name,
    difficulty: difficultyText(post.difficulty),
    tags: post.tags.map((tag) => tag.tags.name)
  };
}
