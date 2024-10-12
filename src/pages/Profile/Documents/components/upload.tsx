import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, GridItem, Select, SimpleGrid, Text, Grid, useBreakpointValue } from "@chakra-ui/react"
import { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { IoChevronBackOutline } from "react-icons/io5"
import { Input } from "../../../../components/Forms/Input"
import { Textarea } from "../../../../components/Forms/textarea"
import { ImFilesEmpty } from "react-icons/im";
import { IDocumentType } from "../../../../schema/Documents"
import saveTypePersonalDocument, { ITypePersonalDocument } from "../../../../services/Employee/save-personal-document.service"
import { toast } from "react-toastify"
import useColabContext from "../../../../context_api"
import updateTypePersonalDocument from "../../../../services/Employee/update-personal-document.service"

interface UpProps {
    dataEdit: ITypePersonalDocument
    setIsUpload: (value: boolean) => void
    typeDoc: IDocumentType[]
}

export const UploadEmployeeDocument = ({ dataEdit, setIsUpload, typeDoc }: UpProps) => {

    console.log("Uploading employee document", dataEdit)

    const { colabProvider } = useColabContext()

    const [file, setFile] = useState<string>()
    const [dataToSave, setDataToSave] = useState<ITypePersonalDocument>(
        {
            employeeId:  dataEdit.employeeId ?? colabProvider.user.id,
            typePersonalDocId: dataEdit && dataEdit.typePersonalDocId,
            docNumber: dataEdit && dataEdit.docNumber,
            attach: dataEdit && dataEdit.attach,
            description: dataEdit && dataEdit.description,
            validateDate: dataEdit && dataEdit.validateDate,
            issueDate: dataEdit && dataEdit.issueDate
        }
    )

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fileProperties, setFileProperties] = useState({
        name: '',
        size: '',
        type: '',
        isValid: false,
    })

    const handleChange = (file) => {
        setFileProperties({
            ...fileProperties,
            name: file.name,
            size: file.size,
            type: file.type,
            isValid: true,
        })

        const reader = new FileReader()

        reader.onload = function () {
            const base64String = reader.result?.toString()
            setFile(base64String)
            setDataToSave({ ...dataToSave, attach: String(base64String) })
        }
        reader.readAsDataURL(file)
    }

    const isMobile = useBreakpointValue({ base: true, md: false })

    const handleChangeTypeDoc = (value: string) => setDataToSave({ ...dataToSave, typePersonalDocId: Number(value) })
    const handleChangeDescription = (value: string) => setDataToSave({ ...dataToSave, description: value })
    const handleChangeDocNumber = (value: string) => setDataToSave({ ...dataToSave, docNumber: value })
    const handleChangeDataEmissao = (value: string) => setDataToSave({ ...dataToSave, issueDate: value })
    const handleChangeDataValidade = (value: string) => setDataToSave({ ...dataToSave, validateDate: value })

    const resetDataToSave = () => setDataToSave({
        employeeId: colabProvider.user.id,
        typePersonalDocId: 0,
        docNumber: '',
        attach: '',
        description: '',
        validateDate: '',
        issueDate: ''
    })

    function saveDocumentPersonal() {

        if (dataToSave.typePersonalDocId === 0) return toast.error("Tipo de Documento é Obrigatório")
        if (dataToSave.docNumber === "") return toast.error("N.º do Documento é Obrigatório")
        if (dataToSave.attach === "") return toast.error("O Anexo, é Obrigatório")

        setIsLoading(true)
        try {

            setTimeout(async () => {
                if (dataToSave) {
                    const response = await saveTypePersonalDocument(dataToSave);
                    if (response && response.response.statusCode === 200) {
                        toast.success(response.response.message)
                        resetDataToSave()
                        setIsUpload(false)
                        setIsLoading(false)
                    }
                }
            }, 1000);
        }
        catch (error) {
            console.error("Error ao salvar documento", error)
            toast.error(String(error))
        } 
    }

    function updateDocumentPersonal() {

        if (dataToSave.typePersonalDocId === 0) return toast.error("Tipo de Documento é Obrigatório")
        if (dataToSave.docNumber === "") return toast.error("N.º do Documento é Obrigatório")
        if (dataToSave.attach === "") return toast.error("O Anexo, é Obrigatório")

        setIsLoading(true)
        try {

            setTimeout(async () => {
                if (dataToSave) {
                    const response = await updateTypePersonalDocument(dataToSave, Number(dataEdit.documentId));
                    if (response && response.response.statusCode === 200) {
                        toast.success(response.response.message)
                        //resetDataToSave()
                        setIsUpload(false)
                        setIsLoading(false)
                    }else{
                        setIsLoading(false)
                    }
                }
            }, 1000);
        }
        catch (error) {
            console.error("Error ao salvar documento", error)
            toast.error(String(error))
        }finally {
        }
    }


    return (
        <Flex flexDirection={'column'} gap={4} width={'100%'}>
            <Box>
                <Flex><Button size={'xs'} onClick={
                    () => setIsUpload(false)
                }><IoChevronBackOutline /> voltar</Button></Flex>
            </Box>
            <Box>

                <Grid
                    templateColumns={'1fr 2fr'}
                    color={'#15171C'}
                    gap={6}
                >
                    <GridItem w="100%">
                        <Flex
                            flexDirection={'column'}
                            gap={4}
                            bgClip={'red'}
                            width={'100%'}
                        >


                            <Card>
                                <CardHeader>
                                    <Text fontSize={'18px'} fontWeight={'bold'}>Adiciona os teus documentos</Text>
                                </CardHeader>
                                <CardBody>
                                    <Flex gap={2} flexDirection={'column'}>
                                        <Box gap={1}>
                                            <Text>Tipo de Documento</Text>
                                            <Select
                                                onChange={(e) => handleChangeTypeDoc(e.target.value)}
                                                defaultValue={String(dataToSave.typePersonalDocId)}
                                            >
                                                <option value='02'>Seleccione uma Opção</option>
                                                {
                                                    typeDoc && typeDoc.map((item) => (<option value={item.id}>{item.description}s</option>))
                                                }
                                            </Select>
                                        </Box>
                                        <Box>
                                            <Text>N.º Documento: </Text>
                                            <Input 
                                                onChange={(e) => handleChangeDocNumber(e.target.value)} 
                                                type="text" 
                                                placeContent={'n.º documento'}
                                                value={ dataToSave.docNumber}
                                                />
                                        </Box>
                                        <Box>
                                            <Text>Descrição (opcional)</Text>
                                            <Textarea
                                                backgroundColor={"white"}
                                                style={{ borderRadius: "8px" }}
                                                rows={3}
                                                name=""
                                                value={ dataToSave.description }
                                                onChange={(e) => handleChangeDescription(e.target.value)}
                                                placeholder="Insere uma descrição"
                                            />
                                        </Box>
                                        <Box>
                                            <Text>Data Emissão</Text>
                                            <Input value={ dataToSave.issueDate} onChange={(e) => handleChangeDataEmissao(e.target.value)} type="date" placeContent={'descrição'} />
                                        </Box>

                                        <Box>
                                            <Text>Data Validade</Text>
                                            <Input value={ dataToSave.validateDate} onChange={(e) => handleChangeDataValidade(e.target.value)} type="date" placeContent={'descrição'} />
                                        </Box>
                                        <Box>
                                            <Text>Anexo</Text>

                                            <FileUploader
                                                height={'100%'}
                                                handleChange={handleChange}
                                                name="file"
                                                types={["pdf"]}
                                                label={'Carrega ou solta o teu documento aqui'}
                                            />
                                        </Box>
                                        <Text color={'yellow.400'}>{file || dataEdit.attach ? `Anexo: ${fileProperties.name }` : ''}</Text>

                                    </Flex>

                                    <CardFooter px={0}>
                                        {
                                            dataEdit.documentId ? 
                                                (
                                                    <>
                                                          <Button
                                            isLoading={isLoading}
                                            loadingText="Actualizando..."
                                            color="white"
                                            colorScheme="green"
                                            size={'md'}
                                            onClick={updateDocumentPersonal}>Actualizar</Button>
                                                    </>
                                                )
                                                 : 
                                                (
                                                    <>
                                                          <Button
                                            isLoading={isLoading}
                                            loadingText="Enviando..."
                                            color="white"
                                            colorScheme="yellow"
                                            size={'md'}
                                            onClick={saveDocumentPersonal}>Enviar</Button>
                                                    </>
                                                )
                                        }
                                       
                                    </CardFooter>
                                </CardBody>
                            </Card>


                        </Flex>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex
                            flexDirection={'column'}
                            gap={4}
                            bgClip={'red'}
                            width={'100%'}
                            height={'100%'}
                        >

                            <Flex flexDirection={'column'} gap={2} height={'100%'}>
                                <Box height={'100%'}>
                                    {
                                        file || dataToSave.attach ? (
                                            <>
                                                <Box>
                                                    <Text fontSize={'12px'} fontWeight={'bold'}>Pré-visualização do Anexo</Text>
                                                </Box>
                                                <Box bgColor={'pink'} height={'80vh'}>
                                                    <iframe src={dataToSave.attach ?? file} id="pdfViewer" width="100%" height="100%"></iframe>
                                                </Box>
                                            </>
                                        ) : (
                                            <>
                                                <Flex height={'100%'} justifyContent={'center'} alignItems={'center'} width={'100%'} flexDirection={'column'} gap={2}>
                                                    <ImFilesEmpty color="#C2912E" size={'48px'} />
                                                    <Text>Pre-Visialização do anexo</Text>
                                                </Flex>
                                            </>
                                        )
                                    }

                                </Box>
                            </Flex>


                        </Flex>
                    </GridItem>
                </Grid>
            </Box>
        </Flex>)
}