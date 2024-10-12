interface IPrintResponseHttp {
    isSuccess: boolean
    message: string
}
export function printResponseHttp(data: any): IPrintResponseHttp {
    console.log('printResponseHttp', data)

    if(data === undefined){
        return {
            isSuccess: false,
            message: ''
        }
    }

    return {
        isSuccess: true,
        message: data?.response.message
    }
}