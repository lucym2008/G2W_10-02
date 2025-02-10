
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { SearchParams, useGlobalSearchParams } from 'expo-router';
import { BotãoInicio } from '@/src/COMPONENTS/objects';
import { height, Vagas, verification, width } from '@/src/firebase/functions/interfaces';
import { fetchJobs } from '@/src/firebase/functions/fuctionsVagas/getVagasTelaVagas-Emprego';

const VagasEmprego = () => {
  const { coleção, campo, valor, coleçãoUnica } = useGlobalSearchParams(); // Obtém o valor passado da tela anterior Home
  const dataBox = {coleção, campo, valor}
  const dataBox2 = {coleçãoUnica}

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const valueData = {setJobs, setFilteredJobs, setLoading }
    fetchJobs(valueData, dataBox, dataBox2); //Envia a função os valores que vc ecolheu na home como parametros
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(job =>
        (job.name && job.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.empresa && job.empresa.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const renderItem = ({ item }: {item: Vagas}) => (
    <View style={stylesVagas.item}>
      <Text style={stylesVagas.title}>{item.name}</Text>
      <Text style={stylesVagas.subTitle}> {item.empresa}</Text>
      <Text style={stylesVagas.text}><Text style={{color: colors.amarelo2}}>Salário:</Text> R$ {item.salario}</Text>
      <Text style={stylesVagas.text}><Text style={{color: colors.amarelo2}}>Modalidades:</Text> {item.modalidades}</Text>      
      <Text style={stylesVagas.text}><Text style={{color: colors.amarelo2}}>Contato:</Text> {item.gmail}</Text>
      <Text style={stylesVagas.text}><Text style={{color: colors.amarelo2}}>localização:</Text> {item.localizacao}</Text>
      <TouchableOpacity
        style={stylesVagas.buttonCandidatar}
        onPress={() => handleCandidatura()}
      >
        <Text style={stylesVagas.buttonText}>Candidatar-se</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
       <View style={styles.containerTop}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar vagas..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
      <View style={styles.containerBottom}>
         <Text style={styles.titleTop}> {campo} {valor}</Text>
               {loading ? (
                 <ActivityIndicator size="large" color={colors.amarelo1} />
               ) : (
                 <FlatList
                   data={filteredJobs}
                   keyExtractor={(item) => item.id}
                   renderItem={renderItem}
                   nestedScrollEnabled={true} // Permite rolar dentro do ScrollView
                   showsVerticalScrollIndicator={false}
                 />
               )}
      </View>
      </ScrollView>
    </View>
  );
};

export default VagasEmprego


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  containerTop: {
    width: width * 1,
    height: height * 0.14,
    padding: 20,
    justifyContent: "center",
    borderBottomStartRadius: 60,
    backgroundColor: colors.amarelo2
  },
  containerBottom: {
    padding: 20,
    width: width * 1,
    height: height * 0.86,
    //backgroundColor: "red"
  },
  searchBar: {
    height: 50,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: colors.tituloBranco,
    fontSize: 18,
  },
  titleTop :{
    color: colors.tituloBranco,
    fontSize: 35,
    marginBottom: 10,
    marginTop: -10,
    fontWeight: "400"
  },
  item: {
    padding: 7,
    paddingBottom: 14,
    marginVertical: 8,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    marginBottom: 2,
    fontWeight: 'bold',
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    color: colors.tituloBranco,
  },
});

const stylesVagas = StyleSheet.create({
  item: {
    padding: 7,
    paddingBottom: 14,
    marginVertical: 8,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center"
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.tituloAmarelo,
  },
  subTitle: {
    fontSize: 21,
    marginBottom: 5,
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
    color: colors.tituloBranco,
  },

  buttonCandidatar: {
    backgroundColor: colors.amarelo2,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.tituloBranco,
    fontSize: 16,
    //fontWeight: 'bold',
  },
});

