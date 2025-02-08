import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  searchCompany,
  CompanyParam,
  updateCompany
} from '@models/companies';
import { sendErrorResponse, sendSuccessResponse } from '@utilities/response';
import { Request, Response } from 'express';
export default class CompanyController {
  async index(req: Request, res: Response) {
    const Companys = await getAllCompanies();
    sendSuccessResponse(res, Companys, 200, 'All Companys');
  }
  async search(req: Request, res: Response) {
    const qs = req.query.qs;
    if (!qs) {
      sendErrorResponse(res, 'Query is empty', 400, 'Query is empty');
    }
    const results = await searchCompany(qs as string);
    sendSuccessResponse(res, results, 200, 'Result for your query');
  }
  async show(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.companyId);
      if (!companyId) {
        throw new Error('Invalid Company id');
      }
      const company = await getCompany(companyId);
      sendSuccessResponse(res, { Company: company }, 200, `Current post with id ${companyId}`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async store(req: Request, res: Response) {
    try {
      const companyParam: CompanyParam = req.body;
      const createdData = await createCompany(companyParam);
      sendSuccessResponse(res, createdData, 200, `Company created successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async update(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.companyId);
      const companyBody: CompanyParam = req.body;
      if (!companyId) {
        throw new Error('Invalid Company id');
      }
      const updatedData = await updateCompany(companyId, companyBody);
      sendSuccessResponse(res, updatedData, 200, `Company updated successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const companyId = Number(req.params.CompanyId);
      if (!companyId) {
        throw new Error('Invalid company id');
      }
      const deletedCompany = await deleteCompany(companyId);
      sendSuccessResponse(res, deletedCompany, 200, `Company deleted successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
}
