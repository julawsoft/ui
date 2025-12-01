import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import type { IProcesso } from "../../schema/InterfaceProcess"

export interface IDataTableProcesso {
  data: IProcesso[]
  page: number
  rowsPerPage: number
  handleChangePage: () => void
  handleChangeRowsPerPage: () => void
}

const DataTableProcessos = ({data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}: IDataTableProcesso) => {
return (
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
  <TableContainer>
      <Table stickyHeader aria-label="tabela com paginação">
          <TableHead>
              <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Criado</TableCell>
                  <TableCell>Acções</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {
              /*data && data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)  // Fatiar os dados conforme a página
                  .map((row, index) => (
                      <TableRow key={index}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
                          <TableCell>
                              <PermissionGate roles={[AppRoles.HOME.podeVerDocumento]}>
                                  <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={() => handleView(row.attach)}
                                      sx={{ marginRight: 1 }}
                                  >
                                      Ver
                                  </Button>
                              </PermissionGate>
                              <PermissionGate roles={[AppRoles.HOME.podeEditarDocumento]}>
                                  <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={() => handleEdit(row.id)}
                                      sx={{ marginRight: 1 }}
                                  >
                                      Editar
                                  </Button>
                              </PermissionGate>
                              <PermissionGate roles={[AppRoles.HOME.podeDeletarDocumento]}>
                                  <Button
                                      variant="outlined"
                                      color="secondary"
                                      onClick={() => handleDelete(row.id)}
                                  >
                                      Deletar
                                  </Button>
                              </PermissionGate>
                          </TableCell>
                      </TableRow>
                  ))
                      */}
          </TableBody>
      </Table>
  </TableContainer>
  <TablePagination
      component="div"
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Linhas por página"
  />
</Paper>
)
}

export default DataTableProcessos