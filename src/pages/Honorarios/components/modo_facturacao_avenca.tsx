import { Box, Table, TableContainer, Typography } from "@mui/material"


export const ModoFacturacaoAvenca = () => {

  return (
    <Box sx={{ p: 0, mt: 3, mb: 5 }}>
      <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2 }}>
        Selecione os itens a faturar
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ background: "#f5f5f5" }}>
            <TableRow>
              <TableCell />
              <TableCell>Data Registo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Tarefa</TableCell>
              <TableCell>Colaborador</TableCell>
              <TableCell>Taxa Horária</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>Valor (AOA)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Checkbox
                    checked={selecionados.includes(r.id)}
                    onChange={() => handleSelecionar(r.id)}
                  />
                </TableCell>
                <TableCell>{r.dataRegisto}</TableCell>
                <TableCell>{r.descricao}</TableCell>
                <TableCell>{r.tarefa}</TableCell>
                <TableCell>{r.colaborador}</TableCell>
                <TableCell>{r.colaboradorTaxa}</TableCell>
                <TableCell>{r.horas ?? "-"}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    value={valores[r.id] ?? r.valor ?? ""}
                    onChange={(e) =>
                      handleAlterarValor(r.id, Number(e.target.value))
                    }
                    disabled={!selecionados.includes(r.id)}
                    sx={{ width: 100 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography variant="h6">
          Total:{" "}
          {total.toLocaleString("pt-PT", {
            style: "currency",
            currency: "AOA",
          })}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGerarHonorario}
          disabled={!canGerarHonorario}
        >
          Gerar Honorário
        </Button>
        <Button
          variant="outlined"
          color="info"
          onClick={handleExportarPDF}
          disabled={total === 0}
        >
          Exportar PDF
        </Button>
      </Box>
    </Box>
  )
}