import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { ContainerRegistrationKeys } from "@medusajs/utils";
import {
  deleteEmployeesWorkflow,
  updateEmployeesWorkflow,
} from "../../../../../workflows/employee/workflows";
import { GetEmployeeParamsType, UpdateEmployeeType } from "../validators";

export const GET = async (
  req: MedusaRequest<GetEmployeeParamsType>,
  res: MedusaResponse
) => {
  const { id, employeeId } = req.params;

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: company_customers } = await query.graph(
    {
      entity: "company_customers",
      fields: req.remoteQueryConfig.fields,
      filters: {
        ...req.filterableFields,
        id: employeeId,
        company_id: id,
      },
    },
    { throwIfKeyNotFound: true }
  );

  return res.status(200).json({
    company_customer: company_customers[0],
  });
};

export const POST = async (
  req: MedusaRequest<UpdateEmployeeType>,
  res: MedusaResponse
) => {
  const { id, employeeId } = req.params;
  const { spending_limit, is_admin } = req.body;

  const { result } = await updateEmployeesWorkflow.run({
    input: {
      id: employeeId,
      company_id: id,
      spending_limit,
      is_admin,
    },
    container: req.scope,
  });

  return res.status(202).json({ company_customer: result }).send();
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id, employeeId } = req.params;

  await deleteEmployeesWorkflow.run({
    input: {
      id: employeeId,
      company_id: id,
    },
    container: req.scope,
  });

  return res.status(204).send();
};
