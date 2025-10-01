export interface IAnexo {
    id: number,
    processo_id: number,
    descricao: string,
    path: string,
    colaborador_id: number,
    created_at: string | null,
    updated_at: string | null,
    colaborador: string,
    funcao: string,
    colaborador_tipo: string
}
