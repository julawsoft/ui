import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function FiltroProcessos({
  clientes = [],
  instituicoes = [],
  estados = [],
  cliente,
  instituicao,
  estado,
  fases,
  fase,
  gestores,
  gestor,
  mFaturacoes,
  mFacturacao,
  dataInicio,
  dataFim,
  handleChangeFase,
  handleChangeGestor,
  handleChangeCliente,
  handleChangeFacturacao,
  handleChangeInstituicao,
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

      {/* fase */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Fase:</Typography>
        <Select
          size="small"
          value={fase ?? ""}
          onChange={handleChangeFase}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione uma opção</em>
          </MenuItem>
          {fases.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.value}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Instituicoes */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Instituições:</Typography>
        <Select
          size="small"
          value={instituicao ?? ""}
          onChange={handleChangeInstituicao}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione uma opção</em>
          </MenuItem>
          {instituicoes.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.descricao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* mFaturacoes */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Modo de Facturação:</Typography>
        <Select
          size="small"
          value={mFacturacao ?? ""}
          onChange={handleChangeFacturacao}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione uma opção</em>
          </MenuItem>
          {mFaturacoes.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.descricao}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* gestores */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Gestores:</Typography>
        <Select
          size="small"
          value={gestor ?? ""}
          onChange={handleChangeGestor}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            <em>Selecione uma opção</em>
          </MenuItem>
          {gestores.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.denominacao}
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
              {e.descricao}
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
