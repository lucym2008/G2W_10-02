// formPessoa.js
import { colors } from '@/src/COMPONENTS/global';
import { Botão, TxtInput } from '@/src/COMPONENTS/objects';
import { auth, db } from '@/src/firebase/config';
import { height, width } from '@/src/firebase/functions/interfaces';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const FormPessoa = () => {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [descricao, setDescricao] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const tipo_conta = 'Pessoa'

  const onRegisterPress = async () => {
    setIsLoading(true);
    if (!name || !email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    } 
    if (password !== confirmarPassword) {
      Alert.alert('As senhas não são iguais.');
      setIsLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const data = {
        uid: uid,
        email,
        password,
        displayName: name,
        descricao,
        tipo_conta: tipo_conta,
        createdAt: new Date(),
      };
      const pessoasSubCollectionRef = doc(db, 'Contas', uid);
      await setDoc(pessoasSubCollectionRef, data);
      
      // Salvar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(data));
      
      Alert.alert("Conta Criada com sucesso!");
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      console.error("Erro ao criar a conta:", error);
      
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Erro", "Esse email já está em uso!");
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert("Erro", "Email inválido!");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao criar a conta. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };
   return (
    <View style={styles.container}>
        <View style={styles.containerMed}>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite seu nome:</Text>
            <TxtInput
              value={name}
              onChangeText={setName}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite o seu gmail:</Text>
            <TxtInput
              value={email}
              onChangeText={setEmail}
              placeholder="..."
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Digite sua senha:</Text>
            <TxtInput
              value={password}
              onChangeText={setPassword}
              placeholder="..."
              secureTextEntry={true}
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.containerMed_AreaInput}>
            <Text style={styles.containerMed_AreaInput_text}>Confirme sua senha:</Text>
            <TxtInput
              value={confirmarPassword}
              onChangeText={setConfirmarPassword}
              placeholder="..."
              secureTextEntry={true}
              placeholderTextColor={colors.amarelo2}
            />
          </View>
          <View style={styles.buttonArea}>
          <Botão onPress={onRegisterPress}> 
              <Text style={styles.textButton}>Cadastrar</Text>
          </Botão>
          </View>
        </View>
    </View>
   );
};

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
    color: colors.preto,
    fontSize: 20,
    fontWeight: '400',
  },
  buttonArea: {
    width: width * 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
});