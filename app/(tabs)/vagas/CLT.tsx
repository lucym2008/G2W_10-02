import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import {  db } from '@/src/firebase/config';
import { Botão } from '@/src/COMPONENTS/objects';
import { Picker } from '@react-native-picker/picker';
import { colors } from '@/src/COMPONENTS/global';
import { useRouter } from 'expo-router';
import { TxtInput } from '@/src/COMPONENTS/objects';
import { height, verification, width } from '@/src/firebase/functions/interfaces';
import { ScrollView } from 'react-native';

export default function CLT() {
  const router = useRouter();
  const [localizacao, setLocalizacao] = useState('');
  const [name, setName] = useState('');
  const [empresa, setEmpresa] = useState(verification().name);
  const [salario, setSalario] = useState('');
  const [gmail, setGmail] = useState(verification().email);
  const [selectedOption, setSelectedOption] = useState('');
  const [Loading, setLoading] = useState(false);
  
  async function handleAddVagaCLT() {
    try {
      setLoading(true);
      const newJob = {
        vaga_id: '',
        vaga_name: name,
        salario,
        gmail,
        empresa,
        modalidades: selectedOption,
        localizacao,
        criadorId: verification().uid,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, 'Vagas-trabalhos'), newJob);
      await updateDoc(docRef, {
        id: docRef.id
      });

      setName('');
      setEmpresa('');
      setSalario('');
      setGmail('');
      setSelectedOption('');
      setLocalizacao('');
      Alert.alert('Concluído!', 'Vaga criada');
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Erro ao adicionar documento');
      console.error('Erro ao adicionar documento:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerTop}>
          <Text style={styles.containerTop_title}>CRIE SUA PRÓPRIA VAGA</Text>
          <Text style={styles.containerTop_subtitle}>Aqui você pode criar suas vagas</Text>
        </View>
        <View style={styles.containerMed}>
          <Text style={styles.containerMed_subTitle}>Obrigatório:</Text>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o nome da vaga:</Text>
            <TxtInput
              value={name}
              onChangeText={setName}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o nome da empresa:</Text>
            <TxtInput
              onChangeText={setEmpresa}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o salário previsto:</Text>
            <TxtInput
              value={salario}
              onChangeText={setSalario}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite a localização da vaga se houver:</Text>
            <TxtInput
              value={localizacao}
              onChangeText={setLocalizacao}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>O modelo de trabalho:</Text>
            <Picker
              selectedValue={selectedOption}
              onValueChange={setSelectedOption}
              style={styles.picker}
            >
              <Picker.Item label="Selecione uma modalidade" value="" />
              <Picker.Item label="Integral" value="Integral" />
              <Picker.Item label="Híbrido" value="Hibrido" />
              <Picker.Item label="Home-office" value="Home-office" />
            </Picker>
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o E-mail correspondente:</Text>
            <TxtInput
              onChangeText={setGmail}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
          {Loading ? (
              <ActivityIndicator size="large" color={colors.amarelo1} />
          ) : (
              <Botão onPress={handleAddVagaCLT}>
                <Text style={styles.textButton}>Criar</Text>
              </Botão> 
          )}    </View>
          </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height*3,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    width: width * 1,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop_title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 5,
    color: colors.amarelo2,
  },
  containerTop_subtitle: {
    fontSize: 17,
    color: colors.tituloBranco,
  },
  containerMed: {
    width: width * 1,
    maxHeight: 1200,
    alignItems: 'center',
  },
  containerMed_subTitle: {
    fontSize: 17,
    color: colors.tituloBranco,
  },
  containerMed_AreaInput: {
    width: width * 0.9,
    maxHeight: 90,
    marginTop: 20,
    justifyContent: 'center',
  },
  containerMed_AreaInput_text: {
    fontSize: 17,
    color: colors.tituloBranco,
    marginBottom: 8,
    marginLeft: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  textButton: {
    color: colors.texto,
    fontSize: 20,
    fontWeight: '400',
  },
  buttonArea: {
    width: width * 1,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAreaText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  textArea: {
    height: 130,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    marginTop: 5,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#333',
  },
});