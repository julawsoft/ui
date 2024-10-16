import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination,
    Button
} from '@mui/material';
import { IDocuments } from '../../services/Documents';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';

interface IPaginatedTable {
    data: IDocuments[];
}

const PaginatedTable = ({ data }: IPaginatedTable) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = (id: number) => console.log("handleEdit", id);
    const handleDelete = (id: number) => console.log("handleDelete", id);

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
                        {data && data
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
                                                onClick={() => handleEdit(row.id)}
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
                            ))}
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
    );
};

export default PaginatedTable;
