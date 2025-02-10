import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { Picker } from '@react-native-picker/picker';
import { FormPessoa } from '../src/firebase/functions/functionForms/forms/formPessoa';
import { FormEmpresa } from '@/src/firebase/functions/functionForms/forms/formEmpresa';

// DIMENSÕES DA TELA
const { width, height } = Dimensions.get('window');

export default function Criar() {
   const [tipoConta, setTipoConta] = useState('');

   const handleValueChange = (value) => {
      setTipoConta(value);
   };

   const renderForm = () => {
      switch (tipoConta) {
         case 'Pessoa':
            return <FormPessoa />; // Renderiza o componente como JSX
         case 'Empresa':
            return <FormEmpresa />;
         case 'Freelancer':
            return <Text>Formulário para Freelancer</Text>;
         default :
            return <Text>Selecione um tipo de conta</Text>;
      }
   };

   return (
      <View style={Style.container}>
         <ScrollView style={{flex: 1}}>
         <View style={Style.cardTop}>
            <Text style={Style.Title}> Criação de contas</Text>
         </View>
         <View style={Style.cardQuestionForm}>
            <Picker
               selectedValue={tipoConta}
               onValueChange={handleValueChange}
               style={Style.picker}
            >
            <Picker.Item label="Tipo da conta" value="" />
            <Picker.Item label="Pessoa" value="Pessoa" />
            <Picker.Item label="Empresa" value="Empresa" />
            <Picker.Item label="Freelancer" value="Freelancer" />
            </Picker>
         </View>
         {renderForm()}
         </ScrollView>
      </View>
   );
}

const Style = StyleSheet.create({
   container: {
      flex: 1,
      width: width * 1,
      height: height * 2,
      alignItems: 'center',
      backgroundColor: "#242424",
   },
   cardTop: {
      height: 120,
      width: width * 1,
      //backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center'
   },
   Title: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.amarelo2
   },
   cardQuestionForm: {
      height: 70,
      width: width * 1,
      //backgroundColor: colors.amarelo2,
      alignItems: "center",
      justifyContent: "space-between"
   },
   cardQuestionForm_title: {
      fontSize: 18,
      color: colors.tituloBranco,
   },
   picker: {
      height: 50,
      width: '90%',
      backgroundColor: colors.cinza,
      color: colors.tituloBranco
    },
});
