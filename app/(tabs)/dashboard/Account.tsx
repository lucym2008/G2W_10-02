import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/COMPONENTS/global';
import { Users, Vagas, width, height, verification } from '@/src/firebase/functions/interfaces';
import { db } from '@/src/firebase/config';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { handleRecovery } from '@/src/firebase/functions/functionsUser/Login';

const Account = () => {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);
  const [userVagasList, setUserVagasList] = useState<Vagas[]>([]);
  const [filteredVagas, setFilteredVagas] = useState<Vagas[]>([]);
  const [filteredUsersData, setFilteredUsersData] = useState<Users[]>([]);

  useEffect(() => {
    userVagas();
    dados_usuario();
    
  }, []);

  async function dados_usuario() {
    const userAuth = verification();
    if (!userAuth.isAuthenticated) {
      console.error("User is not authenticated");
      setLoading(false);
      return;
    }
    try {
      const q = query(
        collection(db, "Contas"),
        where("id", "==", userAuth.uid)
      );
      const querySnapshot = await getDocs(q);      
      const usersDataArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsersData(usersDataArray);
      setFilteredUsersData(usersDataArray);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };
  // Função para buscar as vagas do usuário
  async function userVagas () {
  const userAuth = verification();
  try {
      const q = query(
          collection(db, "Vagas-trabalhos"),
          where("criadorId", "==", userAuth.uid)
      );
      const querySnapshot = await getDocs(q);      
      const UsersVagasArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));
      setUserVagasList(UsersVagasArray);
      setFilteredVagas(UsersVagasArray); // Inicializa com todos os dados
  } catch (error) {
      console.error("Erro vc não esta logado:", error);
  } finally {
      setLoading(false);
  }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.amarelo1} />
        <Text>Loading...</Text>
      </View>
    );
  };

  const renderUserCard = ({ item }: { item: Users }) => (
    <View style={styles.data}>
      <View style={styles.areaTop}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>User - {item.tipo_conta}</Text>
      </View>
      <View style={styles.areaLow}>
        <Text style={styles.sub}>Account Information:</Text>
        <Text style={styles.text}>Contact: {item.email}</Text>
        <Text style={styles.text}>Description: {item.descricao}</Text>
      </View>
    </View>
  );

  const renderVagaCard = ({ item }: { item: Vagas }) => (
    <View style={stylesVagas.item}>
      <View style={stylesVagas.item_areaTitle}>
        <MaterialCommunityIcons name="information-outline" size={30} color="white" />
        <Text style={stylesVagas.title}>{item.name}</Text>
        <MaterialCommunityIcons 
          name="delete" 
          size={30} 
          color="red" 
          onPress={() => {
            Alert.alert(
              "Delete Job Position",
              `Are you sure you want to delete "${item.name}"?`,
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { 
                  text: "Delete", 
                  onPress: () => handleDeleteVaga(item.id),
                  style: "destructive"
                }
              ]
            );
          }} 
        /> 
      </View>
      <Text style={stylesVagas.text}>Company: {item.empresa}</Text>
      <Text style={stylesVagas.text}>Salary: R$ {item.salario}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={filteredUsersData}
          keyExtractor={(item) => item.uid}
          renderItem={renderUserCard}
          scrollEnabled={false}
        />
        
        <Text style={styles.sectionTitle}>Your CLT Positions:</Text>
        
        <View style={stylesVagas.AreaVagasView}>
          <FlatList
            data={filteredVagas}
            keyExtractor={(item) => item.uid}
            renderItem={renderVagaCard}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.tituloBranco,
    marginLeft: 20,
    marginTop: 30,
  },
  data: {
    width: width,
    minHeight: height * 0.15,
    alignItems: 'center',
  },
  areaTop: {
    backgroundColor: colors.fundo2,
    width: '100%',
    height: height * 0.18,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.tituloAmarelo,
    marginTop: 50,
  },
  subTitle: {
    fontSize: 20,
    color: colors.tituloAmarelo,
  },
  areaLow: {
    maxWidth: width * 0.9,
    minHeight: height * 0.15,
    alignItems: 'center',
  },
  sub: {
    fontSize: 22,
    color: colors.tituloBranco,
    marginTop: 13,
    marginBottom: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.tituloBranco,
    marginVertical: 3,
  },
});

const stylesVagas = StyleSheet.create({
  AreaVagasView: {
    padding: 20,
    width: width,
    minHeight: '2%',
  },
  item: {
    padding: 5,
    marginVertical: 8,
    backgroundColor: colors.cinza,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  item_areaTitle: {
    width: width * 0.88,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.tituloAmarelo,
  },
  text: {
    fontSize: 16,
    color: colors.tituloBranco,
  },
});

export async function handleDeleteVaga(vagaId: string) {
  try {
    const userAuth = verification();
    if (!userAuth.isAuthenticated) {
      console.error("User is not authenticated");
      return;
    }

    // Deletar o documento da coleção Vagas-trabalhos
    const vagaRef = doc(db, "Vagas-trabalhos", vagaId);
    await deleteDoc(vagaRef);
    
    // Atualizar a lista de vagas após a exclusão
    filteredVagas();
  } catch (error) {
    console.error("Error deleting job posting:", error);
  }
};

export default Account;