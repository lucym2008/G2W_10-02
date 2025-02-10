// PÁGINA RESPONSÁVEL PELO LAYOUT DAS TABS DO  'INDEX DE DASHBOARD' E 'PÁGINA DE SETTINGS'
import { Stack, Tabs } from "expo-router";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


import { StyleSheet } from "react-native";
import { colors } from "../../../src/COMPONENTS/global";

export default function Layout() {

    return (
        <Tabs
screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 8, // distancia da parte inferior da tela
          left: 20, // distancia da lateral esquerda
          right: 20, // distancia da lateral direita
          borderRadius: 15, // bordas arredondadas
          paddingHorizontal: 20,
          margin: 20,
          justifyContent: "center",
          height: 60, // altura da tab
          backgroundColor: 'white', // cor de fundo da tab
          elevation: 10, // sombra (para Android)
        },

        // tabBarShowLabel: false, // opcional: para esconder os labels das tabs
      }}
        >
            <Tabs.Screen 
            name="index" 
            options={{ 
                headerShown: false,  
                title: "",         
                tabBarLabelStyle: { 
                  fontSize: 12, // ajuste o tamanho da fonte aqui
                  fontWeight: 'bold', // opcional: para deixar o texto em negrito
               },
               tabBarIcon: ({ size, color, focused }) => {
                   return <MaterialCommunityIcons name='home' color={color} size={33} top={5}/>
                   
               },
            }}

        />  


        <Tabs.Screen
          name="Visualizações"
          options={{ 
            headerShown: false, 
            title: "",
            headerTitleStyle: {
               color: "#fff"
            },
            headerStyle: {
                backgroundColor: '#242420', // Cor de fundo do header (azul)
              },            
            tabBarLabelStyle: { 
               fontSize: 12, // ajuste o tamanho da fonte aqui
               fontWeight: 'bold', // opcional: para deixar o texto em negrito
            },
            tabBarIcon: ({ size, color, focused }) => {
                return <MaterialCommunityIcons name='wallet' color={color} size={33} top={5}/>
                
            },
        }}
    />   
        <Tabs.Screen
          name="Account"
          options={{
            headerShown: false, 
            title: "",
            tabBarLabelStyle: { 
               fontSize: 12, // ajuste o tamanho da fonte aqui
               fontWeight: 'bold', // opcional: para deixar o texto em negrito
                marginTop: 5,
            },
            tabBarIcon: ({ size, color, focused }) => {
                return <Ionicons name='settings' color={color} size={32} top={5} />
                
            },
          }}
        />
      </Tabs>
    )
}