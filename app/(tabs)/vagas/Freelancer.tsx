import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Botão } from '@/src/COMPONENTS/objects';
import { colors } from '@/src/COMPONENTS/global';
import { useRouter } from 'expo-router';
import { TxtInput } from '@/src/COMPONENTS/objects';
import { height, width } from '@/src/firebase/functions/interfaces';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/src/firebase/config';

export default function CLT() {
  const router = useRouter();
  const [descricao, setDescricao] = useState('');
  const [genero, setGenero] = useState('');
  const [Competencias, setCompetencias] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [name, setName] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [preco, setPreco] = useState('');
  const [gmail, setGmail] = useState('');
  const [Loading, setLoading] = useState(false);

  const addDataFreelancer = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!name || !descricao || !Competencias || !localizacao || !responsavel || !preco || !gmail) {
      Alert.alert('Erro', 'Todos os campos precisam estar preenchidos');
      return;
    }

    try {
      const newFree = {
        name,
        descricao,
        Competencias,
        localizacao,
        responsavel,
        preco,
        gmail,
        uid: "gnxZyjqSPmXCmzqFlv0001JL1T92", // Certifique-se de que o UID é gerado corretamente
        createdAt: new Date(),
      };

      // Adiciona o novo documento à coleção 'Vagas-trabalho'
      await addDoc(collection(db, 'Vagas-Freelancer'), newFree);

      // Limpa os campos após a adição
      setName('');
      setDescricao('');
      setCompetencias('');
      setLocalizacao('');
      setResponsavel('');
      setPreco('');
      setGmail('');

      Alert.alert('Concluído!', 'Vaga criada com sucesso');
      console.log('Concluído!', 'Vaga criada');

      // Redireciona para o dashboard
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar vaga. Tente novamente.');
      console.error('Erro ao adicionar documento:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerTop}>
          <Text style={styles.containerTop_title}>CRIE SEU SERVIÇO FREELANCER</Text>
          <Text style={styles.containerTop_subtitle}>Aqui você pode criar seus serviços de seu jeito</Text>
        </View>
        <View style={styles.containerMed}>
          <Text style={styles.containerMed_subTitle}>Obrigatório:</Text>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o nome do serviço:</Text>
            <TxtInput
              value={name}
              onChangeText={setName}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o nome da empresa ou responsável:</Text>
            <TxtInput
              value={responsavel}
              onChangeText={setResponsavel}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Margem de preços variada:</Text>
            <TxtInput
              value={preco}
              onChangeText={setPreco}
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
            <Text style={styles.containerMed_AreaInput_text}>Digite o E-mail correspondente:</Text>
            <TxtInput
              value={gmail}
              onChangeText={setGmail}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite suas competençias:</Text>
            <TxtInput
                value={Competencias}
                onChangeText={setCompetencias}
                placeholder="..."
                placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o genero do serviço:</Text>
            <TxtInput
                value={genero}
                onChangeText={setGenero}
                placeholder="..."
                placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Faça uma descrição sua como Freelancer:</Text>
            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="..."
                placeholderTextColor={colors.amarelo1}
                multiline={true}
                numberOfLines={4}
                style={styles.textArea}
                textAlignVertical="top"
            />
          </View>
        </View>
        <View style={styles.buttonArea} >
            <TouchableOpacity >
              <Botão onPress={addDataFreelancer} >
                <Text style={styles.textButton}>Continuar</Text>
              </Botão> 
            </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: height * 2.1,
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
    textAlign: "center",
  },
  containerTop_subtitle: {
    fontSize: 17,
    color: colors.tituloBranco,
    width: 400,
    textAlign: "center",
  },
  containerMed: {
    width: width * 1,
    maxHeight: 800,
    alignItems: 'center',
    marginTop: 10,
  },
  containerMed_subTitle: {
    fontSize: 17,
    color: colors.tituloBranco,
  },
  containerMed_AreaInput: {
    width: width * 0.9,
    maxHeight: 170,
    marginTop: 10,
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
    marginTop: 50,
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
    borderWidth: 1,
    borderColor: colors.amarelo2,
    borderRadius: 7,
    textAlignVertical: 'top',
    fontSize: 16,
    color: colors.tituloBranco,
  },
});