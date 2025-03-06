import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { BotãoInicio } from '@/src/COMPONENTS/objects';
import { useRouter } from 'expo-router';
import { CandidaturaVaga, handleCandidaturaError, height, Vagas, width } from '@/src/firebase/functions/interfaces';
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { getVagas } from '@/src/firebase/functions/fuctionsVagas/getVagas';
import { auth, db } from '@/src/firebase/config';
import { addDoc, collection } from 'firebase/firestore';

// MORRA THEO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  //Essa função ela envia atraves das telas "router.push" os valores q vc selecionou ao clicar na box
  const boxSetores = (coleção: any, campo: any, valor: any) => {
    router.push(`/(tabs)/vagas/VagasEmprego?coleção=${coleção}&campo=${campo}&valor=${valor}`); // Passa ambos os valores como parâmetros
  };
  const CriarVagas = (coleçãoUnica: any) => {
    router.push(`/(tabs)/vagas/VagasEmprego?coleção=${coleçãoUnica}`);
  };

  useEffect(() => {
    const DadosJobs = {setJobs, setFilteredJobs, setLoading }
    getVagas(DadosJobs);
  }, []);
  
  const handleCandidatura = async (vaga: Vagas) => {
    try {
      // Validação dos campos necessários
      if (!vaga.vaga_id || !auth.currentUser?.uid) {
        throw new Error('Dados da vaga ou usuário incompletos');
      }
      
      const candidaturaRef = collection(db, 'candidaturas');
      const novaCandidatura: CandidaturaVaga = {
        id_candidatura: '', // Will be auto-generated
        vaga_id: vaga.vaga_id,
        vaga_name: vaga.vaga_name,
        candidato_name: auth.currentUser?.displayName || 'Usuário',
        candidatoId: auth.currentUser?.uid,
        criadorId: vaga.criadorId,
        dataCandidatura: new Date().toISOString(),
        status: 'pendente'
      };

      await addDoc(candidaturaRef, novaCandidatura);
      alert('Candidatura realizada com sucesso!');
    } catch (error) {
      const handledError = handleCandidaturaError(error);
      console.error(handledError);
      alert(handledError.message || 'Erro ao realizar candidatura');
    }
  };

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
        onPress={() => {handleCandidatura(item)}}      
      >
        <Text style={stylesVagas.buttonText}>Candidatar-se</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>

        <View style={styles.AreaTop}>
          <View style={styles.AreaTop_container}>
              <Text style={styles.AreaTop_Title}>Go 2 Work</Text>
              <Text style={styles.AreaTop_subTitle}>Encontre uma experiençia que pode mudar sua vida bem aqui.</Text>
          </View>
        </View>
        
        <View style={styles.containerBoxs}>
            //Area de box para setores
            <Text style={styles.SubTitle}>Areas de vagas</Text>
            <View style={styles.AreaContainerEmpresas}>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={
                    //Ao clicar no box, vc envia a função boxSetores um 3 valores para servir na busca da pesquisa q vc clicou
                    () => boxSetores('Vagas-trabalho', 'setor', 'Saude')
                  } >
                    <MaterialIcons name="health-and-safety" size={27} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Saúde</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'TI')}  >
                    <MaterialIcons name="computer" size={27} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>TI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'Engenharia')} >
                    <FontAwesome6 name="house-chimney" size={22} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Engenharia</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} onPress={() => boxSetores('Vagas-trabalho', 'setor', 'Educacao')} >
                    <Feather name="book" size={24} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Educação</Text>
                  </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas na sua região:</Text>
                  {loading ? (
                    <ActivityIndicator size="large" color={colors.amarelo1} />
                  ) : (
                    <FlatList
                      data={filteredJobs}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
                    />
                  )}
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio onPress={() => CriarVagas('Vagas-trabalho')} > 
                      <Text style={styles.TextButton}>Clique aqui para ver mais</Text>
                  </BotãoInicio>
              </View>
            </View>
            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas de relacionadas a tecnologia:</Text>
                  {loading ? (
                    <ActivityIndicator size="large" color={colors.amarelo1} />
                  ) : (
                    <FlatList
                      data={filteredJobs}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
                    />
                  )}
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio onPress={() => CriarVagas('Vagas-trabalho')} >
                      <Text style={styles.TextButton}>Clique aqui para ver mais</Text>
                  </BotãoInicio>
              </View>
            </View>
            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas de relacionadas a tecnologia:</Text>
                  {loading ? (
                    <ActivityIndicator size="large" color={colors.amarelo1} />
                  ) : (
                    <FlatList
                      data={filteredJobs}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      scrollEnabled={false} // Previne conflitos de rolagem com o ScrollView
                    />
                  )}
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio onPress={() => CriarVagas('Vagas-trabalho')} >
                      <Text style={styles.TextButton}>Clique aqui para ver mais</Text>
                  </BotãoInicio>
              </View>
            </View>
            <View style={styles.fim}></View>
        </View>
      </ScrollView>
    </View>
  );;
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  scrollArea: {
    flex: 1,
  },
  AreaTop:{
    width: width * 1,
    height: height * 0.21,
    borderBottomLeftRadius: 90,
    backgroundColor: colors.fundo2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AreaTop_container: {
    maxWidth: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AreaTop_Title: {
    fontSize: 40,
    marginBottom: 5,
    color: colors.amarelo2,
    fontWeight: '600'
  },
  AreaTop_subTitle: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.tituloBranco,
  },
  containerBoxs: {
    padding: 15,
    width: width * 1,
    maxHeight: height * 3.9,
    marginTop: 10,
  },
  BoxContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  FlatListBox: {
    width: "100%",
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 20 
  },
  SubTitle: {
    fontSize: 20,
    left: 10,
    marginBottom: 5,
    color: colors.tituloBranco,
  },
  AreaContainerEmpresas: {
    width: "100%",
    maxHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "center"
  },
  BoxContainerEmpresas: {
    width: 100,
    height: 90,
    backgroundColor: colors.cinza,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  BoxContainerEmpresas_text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.amarelo2
  },
  areaButton: {
    width: '100%',
    height: 80,
    top: -10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cinza,
  },
  TextButton: {
    fontSize: 17,
    color: colors.tituloBranco,
    right: 10
  },
  fim: {
    width: width * 1,
    height: 100
  }
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
