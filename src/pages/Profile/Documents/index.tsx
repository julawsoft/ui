import useAsyncState from "../../../hooks/use-async-state";
import { EmployeeManager } from "../../../schema/Employee"
import SpinnerProgress from "../../../components/SpinnerProgress";
import { useEffect, useState } from "react";
import { ErrorLocal } from "../../../components/ErrorLocal";
import { EmptyEmployeeDocument } from "./components/emptyDoc";
import { ListEmployeeDocument } from "./components/listDocument";
import { UploadEmployeeDocument } from "./components/upload";
import { Box, Flex } from "@chakra-ui/react";
import getAllTypePersonalDocument from "../../../services/Employee/get-all-type-personal-document.service";
import { IDocumentType } from "../../../schema/Documents";
import SaveTypePersonalDocument, { ITypePersonalDocument } from "../../../services/Employee/save-personal-document.service";
import saveTypePersonalDocument from "../../../services/Employee/save-personal-document.service";
import getPersonalDocument from "../../../services/Employee/get-personal-document.service";
import useColabContext from "../../../context_api";

interface IEmployeeDocument {
    employee: EmployeeManager
}

export const EmployeeDocument = ({ employee }: IEmployeeDocument) => {

    const { colabProvider } = useColabContext()

    const {
        loading,
        setLoading,
        error,
        setError,
        message,
        setMessage,
        data,
        setData,
    } = useAsyncState<any[]>();

    const [isReload, setIsReload] = useState<boolean>(false)
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const [typePersonalDocumet, setTypePersonalDocumet] = useState<IDocumentType[]>([])

    const [dataEdit, setDataEdit] = useState<ITypePersonalDocument>({
        documentId: 0,
        employeeId: colabProvider.user.id,
        typePersonalDocId: 0,
        docNumber: '',
        attach: '',
        description: '',
        validateDate: '',
        issueDate: ''
    })



    useEffect(() => {
        init()
        getTypeDocumentPersonal()
    }, [isReload, isUpload])


    function getTypeDocumentPersonal() {
        setTimeout(async () => {
            const response = await getAllTypePersonalDocument();
            setTypePersonalDocumet(response as IDocumentType[]);
        }, 1000);
    }


    async function init() {
        setLoading(true)
        try {

            setTimeout(async () => {
                const response = await getPersonalDocument(colabProvider.user.id)
                setData(response.data)
                setLoading(false)
            }, 2000);
           
        } catch (e) {
            setError(true)
            setMessage("Ocorreu um erro ao carregar os dados.")
            setLoading(false)
        } finally {
            setIsReload(false)
        }
    }


    const reload = () => setIsReload(true)

    return (
        <Box bgColor={''} height={'100vh'} py={2}>

            {
                loading && !error ? <SpinnerProgress title="Carregando..." /> : (
                    <>
                        {
                            error ? (
                                <> <ErrorLocal message={message} reload={reload} /> </>
                            ) : (
                                <>
                                    {
                                      
                                                    isUpload ?
                                                        <UploadEmployeeDocument typeDoc={typePersonalDocumet} dataEdit={dataEdit} setIsUpload={setIsUpload} />
                                                        :
                                                        <ListEmployeeDocument setIsReload={setIsReload} setIsUpload={setIsUpload} setDataEdit={setDataEdit} data={data || []} />
                                                
                                           
                                        
                                            
                                    }
                                </>
                            )
                        }
                    </>
                )
            }

        </Box>)
}