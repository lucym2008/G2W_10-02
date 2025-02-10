import { addDoc, collection, Timestamp } from "firebase/firestore";
import React from "react";
import { db } from "../../config";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { verification } from "../interfaces";


export async function handleAddVagaCLT(valueAddVagaCLT: any) {
  const router = useRouter();
  const {
    name, setName,
    salario, setEmpresa,
    gmail, setSalario ,
    empresa, setGmail,
    selectedOption, setSelectedOption,
    localizacao, setLocalizacao,
  } = valueAddVagaCLT;
  try {
    const newJob = {
      name: name,
      salario: salario,
      gmail: gmail,
      empresa: empresa,
      modalidades: selectedOption,
      localizacao: localizacao,
      createdAt: new Date(),
    };
    await addDoc(collection(db, 'Vagas-trabalhos'), newJob);
    setName('');
    setEmpresa('');
    setSalario('');
    setGmail('');
    setSelectedOption('');
    setLocalizacao('');
    Alert.alert('Concluído!', 'Vaga criada');
    console.error('Erro ao adicionar documento:');
    router.replace('/(tabs)/dashboard');
  } catch (error) {
    Alert.alert('Erro ao adicionar documento');
    console.error('Erro ao adicionar documento:', error);
  }
}