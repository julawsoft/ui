import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function FiltroTimeSheets({
  clientes = [],
  processos = [],
  tarefas = [],
  estados = [],
  cliente,
  processo,
  tarefa,
  estado,
  dataInicio,
  dataFim,
  handleChangeCliente,
  handleChangeProcesso,
  handleChangeTarefa,
  handleChangeEstado,
  handleChangeDataInicio,
  handleChangeDataFim,
  handleBuscar,
}: any) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      {/* Cliente */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Cliente:</Typography>
        <Select
          size="small"
          value={cliente ?? ""}
          onChange={handleChangeCliente}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">
            <em>Selecione o cliente</em>
          </MenuItem>
          {clientes.map((c: any) => (
            <MenuItem key={c.id} value={c.id}>
              {c.denominacao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Processo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Processo:</Typography>
        <Select
          size="small"
          value={processo ?? ""}
          onChange={handleChangeProcesso}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione o processo</em>
          </MenuItem>
          {processos.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.ref}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Tarefa */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Tarefa:</Typography>
        <Select
          size="small"
          value={tarefa ?? ""}
          onChange={handleChangeTarefa}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione a tarefa</em>
          </MenuItem>
          {tarefas.map((t: any) => (
            <MenuItem key={t.id} value={t.id}>
              {t.descricao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Estado */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Estado:</Typography>
        <Select
          size="small"
          value={estado ?? ""}
          onChange={handleChangeEstado}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="">
            <em>Selecione o estado</em>
          </MenuItem>
          {estados.map((e: any) => (
            <MenuItem key={e.id} value={e.id}>
              {e.nome}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Intervalo de datas */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Período:</Typography>
        <TextField
          size="small"
          type="date"
          value={dataInicio}
          onChange={handleChangeDataInicio}
        />
        <Typography>até</Typography>
        <TextField
          size="small"
          type="date"
          value={dataFim}
          onChange={handleChangeDataFim}
        />
      </Box>

      {/* Buscar */}
      <Button onClick={handleBuscar} variant="contained" color="primary">
        Buscar
      </Button>
    </Box>
  );
}
