import { APIROUTES } from '../../constants/api-routes'
import { IEmployee } from '../../schema/Employee'
import { IFormFilters, ReportColaboradorSchema } from '../../schema/Reports'
import { RequestApi } from '../../utils/request'
import { TypeReports } from './TypeReports'

export async function filterReportEmployees(
  dataFilter: IFormFilters,
): Promise<IEmployee[]> {
  const response = await new RequestApi().get<
    IEmployee[]
  >(`${APIROUTES.reportsEmployess}/${TypeReports.REPORT_EMPLOYEE}/${ReportColaboradorSchema.provinceId}=${dataFilter.provinceId}&${ReportColaboradorSchema.categoriaId}=${dataFilter.categoriaId}&${ReportColaboradorSchema.departamentId}=${dataFilter.departamentId}&
${ReportColaboradorSchema.typeContractId}=${dataFilter.typeContractId}&${ReportColaboradorSchema.status}=${dataFilter.status}&${ReportColaboradorSchema.download}=${dataFilter.download}
      `)
  return response.data
}
