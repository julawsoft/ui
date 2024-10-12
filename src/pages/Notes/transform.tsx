import { INotesList } from '../../schema/Notes'

export function noteTransform(data: INotesList[]) {
  return data && data.map((item: INotesList, key: number) => ({}))
}
