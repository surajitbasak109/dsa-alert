import { Platform } from '@prisma/client';
import db from 'src/utilities/db';

export type PlatformParam = Omit<Platform, 'id' | 'createdAt' | 'updatedAt'>;

export async function getAllPlatforms() {
  const platforms = await db.platform.findMany({
    select: { id: true, name: true }
  });
  return platforms;
}

export async function createPlatform(platform: PlatformParam) {
  const existingPlatform = await db.platform.findUnique({
    where: {
      name: platform.name
    }
  });

  if (existingPlatform) {
    throw new Error('Platform already exist');
  }

  const newData = await db.platform.create({
    data: {
      ...platform
    }
  });
  return newData;
}

export async function updatePlatform(id: number, platform: PlatformParam) {
  const existingPlatform = await db.platform.findFirst({
    where: {
      id
    }
  });

  if (!existingPlatform) {
    throw new Error('Platform does not exist');
  }

  const updatedData = await db.platform.update({
    where: {
      id
    },
    data: {
      ...platform
    }
  });

  return updatedData;
}

export async function deletePlatform(id: number) {
  const platform = await db.platform.findFirst({ where: { id } });
  if (!platform) {
    throw new Error('Platform not found');
  }
  const deletedPlatform = await db.platform.delete({
    where: {
      id
    }
  });
  return deletedPlatform;
}

export async function getPlatform(id: number): Promise<Platform> {
  const platform = await db.platform.findFirst({
    where: { id }
  });
  if (!platform) {
    throw new Error('platform not found');
  }
  return platform;
}
