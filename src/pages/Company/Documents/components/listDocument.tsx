import { useState } from "react"
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react"
import { Plus } from "phosphor-react"
import { IDocumentDTORequest } from "../../../../schema/HomeCard"
import { CardRequestHome } from "../../../../components/CardRequestHome"
import { FaRegFilePdf } from "react-icons/fa"
import { translate } from "../../../../utils/language/pt"
import { DisplayDateAndHourtString } from "../../../../utils/convertDatas"
import { downloadFile } from "../../../../utils/download"
import { IPersonalDocument } from "../../../../services/Employee/get-personal-document.service"
import { CardDocumentEmployee } from "../../../../components/CardDocumentEmployee"
import useColabContext from "../../../../context_api"
import { ITypePersonalDocument } from "../../../../services/Employee/save-personal-document.service"
import removeTypePersonalDocument from "../../../../services/Employee/remove-personal-document.service"
import { toast } from "react-toastify"
import { EmptyEmployeeDocument } from "./emptyDoc"


interface ListProps {
    data: any[] | undefined
    setIsUpload: (value: boolean) => void
    setIsReload: (value: boolean) => void
    setDataEdit: (data: ITypePersonalDocument) => void
}


export const ListEmployeeDocument = ({ data, setIsUpload, setDataEdit, setIsReload }: ListProps) => {

    const { colabProvider } = useColabContext()

    const handleViewAnexoSelected = (attach: string) => {
        const path = `${import.meta.env.VITE_BASE_URI}open_personal_document/${attach}`
        window.open(path, '_blank', 'noopener,noreferrer')
    }

    const handleDownloadAttach = (attach: string) => {
        const path = `${import.meta.env.VITE_BASE_URI}open_personal_document/${attach}`
        downloadFile(path, attach)
    }

    const handleEdit = (item: IPersonalDocument) => {

        console.log("Edit >>> ", item)

        setIsUpload(true)

        setDataEdit(
            {
                documentId: item.id,
                employeeId: item.employee_id,
                typePersonalDocId: item.type_personal_doc_id,
                docNumber: item.doc_number,
                attach: `${import.meta.env.VITE_BASE_URI}open_personal_document/${item.attach}`,
                description: item.description,
                validateDate: item.validate_date,
                issueDate: item.date_issue
            }
        )
    }

    const handleDelete = (id: number) => {
        console.log("delete document employee", id)
        try {
            setTimeout(async () => {
                const response = await removeTypePersonalDocument(id);
                if (response && response.response.statusCode === 200) {
                    toast.success(response.response.message)
                    // resetDataToSave()
                    setIsReload(true)
                    //setIsLoading(false)
                } else {
                    toast.success(response.response.message)
                }
            }, 1000);
        }
        catch (error) {
            console.error("Error ao salvar documento", error)
            toast.error(String(error))
        }


    }



    return (
        <>
            {
                data && data?.length ? (

                    <>
                        <Flex width={'100%'} flexDirection={'column'}>
                            <Flex justifyContent={'flex-end'}>
                                <Button size="md" colorScheme="yellow" color="#fff" onClick={() => setIsUpload(true)}> Adicionar </Button>
                            </Flex>
                            <Box>


                                <SimpleGrid
                                    columns={{ sm: 1, md: 2, lg: 3 }}
                                    spacing="10px"
                                >
                                    {data.map((item: IPersonalDocument) => (
                                        <Box mt={4}>
                                            <CardDocumentEmployee
                                                icon={<FaRegFilePdf />}
                                                solicitacao={item.TypePersonalDoc.description}
                                                status={'ANEXADO'}
                                                statusText={'green'}
                                                created={DisplayDateAndHourtString(String(item.created_at))}
                                                note={item.doc_number}
                                                attach={item.attach}
                                                isApproved={colabProvider.user.id !== item.employee_id}
                                                handleEdit={() => handleEdit(item)}
                                                handleDelete={() => handleDelete(item.id)}
                                                handleViewAttach={() => handleViewAnexoSelected(item.attach)}
                                                handleDownloadAttach={() => handleDownloadAttach(item.attach)} />
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Flex>
                    </>

                ) :
                    (
                        <EmptyEmployeeDocument setIsUpload={setIsUpload} />
                    )}
        </>

    )
}