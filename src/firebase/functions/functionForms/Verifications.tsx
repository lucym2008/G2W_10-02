import { Alert } from "react-native";

// Função de verificação
export default function VerificationVagasCLT1(handleVerificationVagasCLT1: any) {
    const {
        name,
        empresa,
        salario,
        localizacao,
        selectedOption,
        gmail
    } = handleVerificationVagasCLT1;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!name || !empresa || !salario || !localizacao || !selectedOption || !gmail) {
        Alert.alert('Erro', 'Todos os campos precisam estar preenchidos');
        return false; // Retorna false se a verificação falhar
    }

    // Verifica se o salário é um número válido
    if (isNaN(Number(salario))) {
        Alert.alert('Erro', "O salário deve ser um número válido.");
        return false; // Retorna false se o salário não for válido
    } else {

    // Se todas as verificações passarem, retorna true
    return true;
    }
}