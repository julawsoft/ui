import { Box, Button, InputGroup, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardForm } from "../../../../components/Forms/CardForm";
import SpinnerProgress from "../../../../components/SpinnerProgress";
import { Toast } from "../../../../components/Toast";
import useAsyncState from "../../../../hooks/use-async-state";
import { updatePasswordEmployeeService } from "../../../../services/Employee/update_password_employee.service";
import { Input } from "../../../../components/Forms/Input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes/constants";
import useColabContext, {
  IColabContext,
  keyLocalStorage,
} from "../../../../context_api";
import {
  clearLocalStorageSecret,
  setLocalStorageSecret,
} from "../../../../context_api/utils";

const schema = z.object({
  newPassword: z.string().min(6),
  oldPassword: z.string().min(6),
  repeatNewPassword: z.string().min(6),
});

type ChangeUserPasswordSchemaInputs = z.infer<typeof schema>;

const CredentialForm: any = ({
  newPassword,
  oldPassword,
  repeatNewPassword,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeUserPasswordSchemaInputs>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const { colabProvider, setData } = useColabContext();

  const { loading, setLoading, setToastMessage, toastMessage } =
    useAsyncState();
  const [enableEdit, setEnableEdit] = useState(false);

  const logoutFn = () => {
    const { auth, ...rest } = colabProvider;
    const updatedColabProvider: IColabContext = {
      auth: {
        ...auth,
        isLogged: false,
      },
      ...rest,
    };
    setData({ ...updatedColabProvider });
    clearLocalStorageSecret();
    setLocalStorageSecret(
      keyLocalStorage,
      JSON.stringify({
        auth: {
          isLogged: false,
          accessToken: "",
          refreshToken: "",
          sub: "",
          profile: "",
          roles: [],
        },
        user: {
          id: 0,
          name: "",
          funcao: "",
        },
        notifications: {
          isActive: false,
        },
        system: {
          company: "Cetim Tecnologia, SA",
          software: "Colab",
          version: "2.0.1",
          build: "dhiqyw/24",
          licenseType: "pay",
          moreInfo: "https://colab.ao",
        },
        menu: {
          sidebarIsActive: true,
        },
      })
    );

    navigate(ROUTES.Login);
  };

  useEffect(() => {
    setEnableEdit(true);
  }, []);

  const handleSave: SubmitHandler<any> = async (data) => {
    setLoading(true);
    try {
      if (data.newPassword !== data.repeatNewPassword)
        return setToastMessage({
          message: "Palavra-passe Nova e Palavra-passe Nova Repetida não coincidem!",
          status: "error",
          title: "Erro das Credecias",
        });

      const response = await updatePasswordEmployeeService({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (response) {
        if (response.response.statusCode === 200) {
          toast.success(response.response.message);
          reset();
          setTimeout(() => {
            logoutFn();
          }, 3000);
        } else {
          toast.error(String(response.response.message));
        }

        setLoading(false);
        // onSave()
      }
    } catch (error) {
      setLoading(false);
      toast.error(String(error));
    }
  };

  if (loading) return <SpinnerProgress></SpinnerProgress>;

  return (
    <CardForm>
      <SimpleGrid spacing={4}>
        <form onSubmit={handleSubmit(handleSave)}>
          <SimpleGrid spacing={4}>
            <InputGroup size={"lg"}>
              <Input
                label="Palavra-passe actual"
                placeholder="Palavra-passe actual"
                type="password"
                isDisabled={!enableEdit}
                backgroundColor={"white"}
                borderColor={"gray.100"}
                error={errors.oldPassword}
                value={oldPassword}
                {...register("oldPassword", {
                  required: "Campo obrigatório",
                })}
              />
            </InputGroup>

            <Input
              label="Palavra-passe nova"
              placeholder="Palavra-passe nova"
              type="password"
              isDisabled={!enableEdit}
              backgroundColor={"white"}
              borderColor={"gray.100"}
              error={errors.newPassword}
              value={newPassword}
              {...register("newPassword", {
                required: "Campo obrigatório",
              })}
            />
            <Input
              label="Repetir Palavra-passe nova"
              placeholder="Repetir Palavra-passe nova"
              type="password"
              isDisabled={!enableEdit}
              backgroundColor={"white"}
              borderColor={"gray.100"}
              value={repeatNewPassword}
              error={errors.repeatNewPassword}
              {...register("repeatNewPassword", {
                required: "Campo obrigatório",
              })}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                style={{ backgroundColor: "#C2912E", color: "#fff" }}
                variant="outline"
                isDisabled={!enableEdit}
              >
                Alterar
              </Button>
            </Box>
          </SimpleGrid>
        </form>
        {toastMessage && (
          <Toast
            title={toastMessage.title}
            description={toastMessage.message}
            status={toastMessage.status}
            isShow={!!toastMessage}
          ></Toast>
        )}
      </SimpleGrid>
    </CardForm>
  );
};

export default CredentialForm;
