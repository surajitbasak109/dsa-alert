import { Tag } from '@prisma/client';
import db from 'src/utilities/db';

export type TagParam = Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>;

export async function searchTag(qs: string) {
  const results = await db.tag.findMany({
    select: {
      id: true,
      name: true
    },
    where: {
      name: { contains: qs }
    }
  });
  return results;
}

export async function getAllTags() {
  const tags = await db.tag.findMany({
    include: {
      posts: {
        select: {
          post: {
            select: {
              title: true,
              platform: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
  return tags.map((tag) => {
    return {
      ...tag,
      posts: tag.posts.map((post) => ({
        ...post.post,
        platform: post.post?.platform?.name
      }))
    };
  });
}

export async function createTag(tag: TagParam) {
  const existingTag = await db.tag.findUnique({
    where: {
      name: tag.name
    }
  });

  if (existingTag) {
    throw new Error('Tag already exist');
  }

  const newData = await db.tag.create({
    data: {
      ...tag
    }
  });
  return newData;
}

export async function updateTag(id: number, tag: TagParam) {
  const existingTag = await db.tag.findFirst({
    where: {
      id
    }
  });

  if (!existingTag) {
    throw new Error('Tag does not exist');
  }

  const updatedData = await db.tag.update({
    where: {
      id
    },
    data: {
      ...tag
    }
  });

  return updatedData;
}

export async function deleteTag(id: number) {
  const tag = await db.tag.findFirst({ where: { id } });
  if (!tag) {
    throw new Error('Tag not found');
  }
  await db.tagsOnPosts.deleteMany({
    where: {
      tagId: id
    }
  });
  const deletedTag = await db.tag.delete({
    where: {
      id
    }
  });
  return deletedTag;
}

export async function getTag(id: number) {
  const tag = await db.tag.findFirst({
    where: { id },
    include: {
      posts: {
        select: {
          post: {
            select: {
              title: true
            }
          }
        }
      }
    }
  });
  if (!tag) {
    throw new Error('Tag not found');
  }
  return tag;
}
