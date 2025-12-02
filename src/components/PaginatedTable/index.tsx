/*
import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination,
    Button
} from '@mui/material';
import PermissionGate from '../../utils/PermissionGate';
import { AppRoles } from '../../routes/AppRoles';

interface IPaginatedTable<T> {
    data: T[];
    handleEdit: (id: number | undefined) => void 
    handleDelete: (id: number | undefined) => void 
    handleView: (id: string) => void 
}

const PaginatedTable = ({ data, handleEdit, handleDelete, handleView  }: IPaginatedTable) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(event)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

*/
