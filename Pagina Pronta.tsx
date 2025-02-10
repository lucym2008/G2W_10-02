import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/src/COMPONENTS/global';
import { BotãoInicio } from '@/src/COMPONENTS/objects';
import { height, width } from '@/src/firebase/functions/interfaces';
import { Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const Index = () => {
  return (
    <View style={styles.container}> /*TUDO*/

      <ScrollView style={styles.scrollArea}> /*AREA PARA SCROLL*/
z
                    /*PARTE DO TOPO*/
        <View style={styles.AreaTop}>
          <View style={styles.AreaTop_container}>
              <Text style={styles.AreaTop_Title}>Go 2 Work</Text>
              <Text style={styles.AreaTop_subTitle}>Encontre uma experiençia que pode mudar sua vida bem aqui.</Text>
          </View>
        </View>

                   /*CAIXA DE GENEROS*/
        <View style={styles.containerBoxs}>
            //Area de box para setores
            <Text style={styles.SubTitle}>Areas de vagas</Text>
            <View style={styles.AreaContainerEmpresas}>

                             /*GENEROS E BOTÕES*/
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={styles.BoxContainerEmpresas}>
                    <MaterialIcons name="health-and-safety" size={27} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Saúde</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} >
                    <MaterialIcons name="computer" size={27} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>TI</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} >
                    <FontAwesome6 name="house-chimney" size={22} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Engenharia</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BoxContainerEmpresas} >
                    <Feather name="book" size={24} color={colors.amarelo2} />
                    <Text style={styles.BoxContainerEmpresas_text}>Educação</Text>
                  </TouchableOpacity>
              </ScrollView>
            </View>

                      /*FlatList 1*/
            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas na sua região:</Text>
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio > 
                      <Text style={styles.TextButton}>Clique aqui para ver mais</Text>
                  </BotãoInicio>
              </View>
            </View>

                      /*FlatList 2*/
            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas de relacionadas a tecnologia:</Text>
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio /* onPress={() => CriarVagas('Vagas-trabalho')} */>
                      <Text style={styles.TextButton}>Clique aqui para ver mais</Text>
                  </BotãoInicio>
              </View>
            </View>

                      /*FlatList 3*/
            <View style={styles.BoxContainer}>
              <View style={styles.FlatListBox}>
                  <Text style={styles.SubTitle}>Vagas de relacionadas a tecnologia:</Text>
              </View>
              <View style={styles.areaButton}>
                  <BotãoInicio>
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

const styles = StyleSheet.create({           /*PODE ESTAR CONFUSO A ORDEM EM QUE APARECEM MAS ESTA OK*/
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
    width: width * 1,
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