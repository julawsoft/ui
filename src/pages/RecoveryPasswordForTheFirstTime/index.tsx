import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Envelope } from "phosphor-react";
import useAsyncState from "../../hooks/use-async-state";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ForgotPasswordService } from "../../services/Auth/forgotPassword";
import { toast } from "react-toastify";

const recoverPasswordSchema = z.object({
  email: z.string().email(),
});

type RecoverPasswordInput = z.infer<typeof recoverPasswordSchema>;

export function RecoveryPasswordForTheFirstTime() {
  const { setSuccess } = useAsyncState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecoverPasswordInput>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  async function handleRecoveryPassword(data: RecoverPasswordInput, event) {
    try {
      const response = await ForgotPasswordService.send(data.email);

      if (response) {
        if (response.response.statusCode !== 200) {
          toast.error("Houve um erro! Por favor tente novamente.");
        } else {
          toast.success(
            "Enviaremos um e-mail para a tua caixa de correio dentro de alguns minutos. Por favor aguarde!"
          );
        }
        reset();
        setSuccess(true);
      }
    } catch (err: any) {
      setSuccess(false);
      toast.error(JSON.stringify(err.message));
    }
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      align={"center"}
      justify={"center"}
      bg="gray.900"
    >
      <Flex
        as={"form"}
        onSubmit={handleSubmit(handleRecoveryPassword)}
        maxWidth={480}
        width={"100%"}
        bg={"gray.800"}
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Flex
          justify="center"
          align="center"
          flexDir="column"
          mb="16"
          color="gray.100"
          gap={2}
        >
          <Flex align="center" gap={2}>
            <Text fontSize="2xl" fontWeight="semibold" fontFamily="Poppins">
              Bem-vindo(a) ao Colab
            </Text>
          </Flex>
          <Box>
            <Text textAlign="center" fontSize={"lg"} color="gray.300">
              Digite o seu e-mail para activar a tua conta.
            </Text>
          </Box>
        </Flex>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel
              htmlFor="email"
              color={"gray.300"}
              fontFamily="Poppins"
              fontWeight="medium"
            >
              E-mail
            </FormLabel>
            <InputGroup size={"lg"}>
              <InputLeftElement pointerEvents="none">
                <Envelope size={24} color="#9699B0" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                focusBorderColor="yellow.300"
                bgColor="gray.900"
                color="gray.100"
                variant="filled"
                size={"lg"}
                _hover={{
                  bgColor: "gray.900",
                }}
                {...register("email")}
              />
            </InputGroup>
            {errors.email?.message && (
              <Text color="red">{`${JSON.stringify(
                errors.email.message
              )}`}</Text>
            )}
          </FormControl>
          <Flex justifyContent={"end"}>
            <Text
              as={"a"}
              href="mailto:suporte@cetim.ms"
              target="_blank"
              fontWeight={500}
              cursor={"pointer"}
              fontSize={14}
              color={"#F2C112"}
              rel={"noreferrer"}
            >
              Suporte DDT
            </Text>
          </Flex>
        </Stack>

        <Button
          isLoading={isSubmitting}
          loadingText="Enviando"
          type="submit"
          size={"lg"}
          mt={6}
          colorScheme="yellow"
        >
          Enviar
        </Button>
      </Flex>
    </Flex>
  );
}
