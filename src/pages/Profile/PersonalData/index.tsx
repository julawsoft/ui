import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import SpinnerProgress from "../../../components/SpinnerProgress";
import useAsyncState from "../../../hooks/use-async-state";
import CorporateInformation from "./components/CorporateInformation";
import GeneralInformation from "./components/GeneralInformation";
import Identification from "./components/identification";
import { EmployeeManager } from "../../../schema/Employee";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateEmployee } from "../../../services/Employee/update-employee.service";

import useCreateEmployee from "./use-create";
import { toast } from "react-toastify";
interface EmployeeForm {
  nome: string;
  email: string;
  born_date: string;
  genero: string;
  nationality: string;
  phone_number: string;
  alternative_phone: string;
  address: string;
  employee_number: string;
  category_id: string;
  role_id: string;
  type_document_id: string;
  document_number: string;
}

const employeeSchema = z.object({
  nome: z.string().min(5),
  email: z.string().min(6),
  born_date: z.string(),
  genero: z.string(),
  nationality: z.string(),
  phone_number: z.string(),
  alternative_phone: z.string(),
  address: z.string().min(10),
  employee_number: z.string(),
  category_id: z.string(),
  role_id: z.string(),
  type_document_id: z.string(),
  document_number: z.string(),
});

interface PersonalDataProps {
  employee: EmployeeManager;
}
type ChangeEmployeechemaInputs = z.infer<typeof employeeSchema>;

const PersonalData: FC<PersonalDataProps> = ({ employee }) => {
  const { loading } = useAsyncState();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDisableForm, setIsDisableFrom] = useState({
    form1: true,
    form2: true,
    form3: true,
  });
  const { identificationsType, categories, roles } = useCreateEmployee();

  const lockAllInputs = () =>
    setIsDisableFrom({ form1: true, form2: true, form3: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmployeechemaInputs>({
    resolver: zodResolver(employeeSchema),
  });

  const transformDataToUpdateEmployee = (data: EmployeeForm) => {
    return {
      employee_id: employee.id,
      name: data.nome,
      gender: data.genero,
      about: employee.about,
      birthday: data.born_date,
      nationality: data.nationality,
      photo: employee.photo,
      email: data.email,
      phone: data.phone_number,
      alternative_phone: data.alternative_phone,
      address: data.address,
      category_id: data.category_id,
      contract_id: employee.Contract[0].id,
      contact_id: employee.Contact.id,
      role_id: data.role_id,
      type_document_id: data.type_document_id
        ? Number(data.type_document_id)
        : null,
      document_number: data.document_number,
      employee_number: data.employee_number,
    };
  };

  const handleSaveUpdateEmployee = async (data: EmployeeForm) => {
    const dataPayload = transformDataToUpdateEmployee(data);
    setIsSaving(true);
    try {
      const response = await updateEmployee(dataPayload);

      if (response) {
        if (response.response.statusCode === 200) {
          toast.success(response.response.message);
          lockAllInputs();
          setIsSaving(false);
        } else {
          toast.error(String(response.response.message));
          setIsSaving(false);
        }
      }
    } catch (e) {
      toast.error(String(e));
      setIsSaving(false);
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerProgress></SpinnerProgress>
      ) : (
        <Flex flexDirection="column">
          {employee && (
            <>
              <form onSubmit={handleSubmit(handleSaveUpdateEmployee)}>
                <SimpleGrid columns={{ sm: 2, md: 3, lg: 3 }} spacing="20px">
                  <Box
                    border={"1px solid #f2f2f2"}
                    boxShadow={"sm"}
                  >
                    <Flex flexDirection={"column"}>
                      <Box px={4} py={2} bgColor={"#25282A"} color={"#C2912E"}>
                        <Text fontSize={"1.4rem"}>Dados Pessoais</Text>
                      </Box>
                      <GeneralInformation
                        employee={employee}
                        register={register}
                        errors={errors}
                        isSaving={isSaving}
                        isDisableForm={isDisableForm}
                        setIsDisableFrom={setIsDisableFrom}
                      ></GeneralInformation>
                    </Flex>
                  </Box>
                  <Box
                    border={"1px solid #f2f2f2"}
                    boxShadow={"sm"}
                  >
                    <Flex flexDirection={"column"}>
                      <Box px={4} py={2} bgColor={"#25282A"} color={"#C2912E"}>
                        <Text fontSize={"1.4rem"}>
                          Identificação e Endereço
                        </Text>
                      </Box>
                      <Identification
                        employee={employee}
                        register={register}
                        errors={errors}
                        isSaving={isSaving}
                        isDisableForm={isDisableForm}
                        setIsDisableFrom={setIsDisableFrom}
                        identificationsType={identificationsType}
                      ></Identification>
                    </Flex>
                  </Box>
                  <Box
                    border={"1px solid #f2f2f2"}
                    boxShadow={"sm"}
                  >
                    <Flex flexDirection={"column"}>
                      <Box px={4} py={2} bgColor={"#25282A"} color={"#C2912E"}>
                        <Text fontSize={"1.4rem"}>Dados Corporativos</Text>
                      </Box>
                      <CorporateInformation
                        employee={employee}
                        register={register}
                        errors={errors}
                        isSaving={isSaving}
                        isDisableForm={isDisableForm}
                        setIsDisableFrom={setIsDisableFrom}
                        categories={categories}
                        roles={roles}
                      ></CorporateInformation>
                    </Flex>
                  </Box>
                </SimpleGrid>
              </form>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default PersonalData;
