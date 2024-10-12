import { PropsStateSystem } from "../../schema/System"
import { RequestApi } from "../../utils/request"

export async function updateSystemConfig(data: PropsStateSystem) {
    const response = await new RequestApi().put<PropsStateSystem>('system_config/1', data)
    return response.response
}

  