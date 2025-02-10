import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { TxtInput } from '../src/COMPONENTS/objects';
import { Botão } from '../src/COMPONENTS/objects';
import { handleRecovery, onLoginPress } from '@/src/firebase/functions/functionsUser/Login';
import { colors } from '@/src/COMPONENTS/global';

export default function Login() {
  const router = useRouter(); // Rotas
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const ValuesLogin = { email, password, setIsLoading, router };
    await onLoginPress(ValuesLogin);
  };

  const handleRecoveryPress = async () => {
    const valueRecovery = { email };
    await handleRecovery(valueRecovery);
  };

  return (
    <View style={Style.container}>
      <View style={Style.cardTop}></View>
      <View style={Style.cardBottom}>
        <Text style={Style.Title}>Tela de Login</Text>
        <Text style={Style.text}>Digite seu email:</Text>
        <TxtInput 
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{color: "black"}}
        />
        <Text style={Style.text}>Digite sua senha:</Text>
        <TxtInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Botão activeOpacity={0.8} onPress={handleRecoveryPress}>
          <Text style={{ fontSize: 18 }}>Recuperar senha</Text>
        </Botão>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.amarelo1} />
        ) : (
          <Botão activeOpacity={0.8} onPress={handleLogin} >
            <Text style={{ fontSize: 18 }}>Entrar</Text>
          </Botão>
        )}
        <Text style={Style.textBottom}>
          Não tem conta?{' '}
          <Link href="/" style={Style.links}>
            crie aqui agora!
          </Link>
        </Text>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#242424",
  },
  cardTop: {
    height: '30%',
  },
  cardBottom: {
    height: '70%',
    width: '100%',
    backgroundColor: "white",
    alignItems: "center",
    padding: 30,
  },
  Title: {
    fontSize: 30,
    color: colors.fundo,
    fontWeight: '500',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: colors.fundo,
  },
  textBottom: {
    fontSize: 18,
    top: 100,
    color: colors.fundo,
  },
  links: {
    color: colors.amarelo1,
  },
});