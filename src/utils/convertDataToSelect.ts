export function convertDataToSelect(
  data: any[],
  label: string,
  isValueId: boolean = true,
) {
  return data && data.length > 0
    ? data.map((item) => ({
        id: item?.id,
        description: item[label],
        value: !isValueId ? item?.description : item?.id,
      }))
    : []
}
