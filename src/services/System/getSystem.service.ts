import { PropsStateSystem } from "../../schema/System"
import { RequestApi } from "../../utils/request"

export async function getSystemConfig() : Promise<PropsStateSystem> {
    const response = await new RequestApi().get<PropsStateSystem>('system_config/1')
    return response.data
}

  