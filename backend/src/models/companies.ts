import { Company } from '@prisma/client';
import db from 'src/utilities/db';

export type CompanyParam = Omit<Company, 'id'>;

export async function searchCompany(qs: string) {
  const results = await db.company.findMany({
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

export async function getAllCompanies() {
  const companies = await db.company.findMany({
    include: {
      posts: {
        select: {
          posts: {
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
  return companies.map((company) => {
    return {
      ...company,
      posts: company.posts.map((post) => ({
        ...post.posts,
        platform: post.posts?.platform?.name
      }))
    };
  });
}

export async function createCompany(company: CompanyParam) {
  const existingCompany = await db.company.findUnique({
    where: {
      name: company.name
    }
  });

  if (existingCompany) {
    throw new Error('Company already exist');
  }

  const newData = await db.company.create({
    data: {
      ...company
    }
  });
  return newData;
}

export async function updateCompany(id: number, company: CompanyParam) {
  const existingCompany = await db.company.findFirst({
    where: {
      id
    }
  });

  if (!existingCompany) {
    throw new Error('Company does not exist');
  }

  const updatedData = await db.company.update({
    where: {
      id
    },
    data: {
      ...company
    }
  });

  return updatedData;
}

export async function deleteCompany(id: number) {
  const company = await db.company.findFirst({ where: { id } });
  if (!company) {
    throw new Error('Company not found');
  }
  await db.companiesOnPosts.deleteMany({
    where: {
      companyId: id
    }
  });
  const deletedcompany = await db.company.delete({
    where: {
      id
    }
  });
  return deletedcompany;
}

export async function getCompany(id: number) {
  const company = await db.company.findFirst({
    where: { id },
    include: {
      posts: {
        select: {
          posts: {
            select: {
              title: true
            }
          }
        }
      }
    }
  });
  if (!company) {
    throw new Error('Company not found');
  }
  return company;
}
