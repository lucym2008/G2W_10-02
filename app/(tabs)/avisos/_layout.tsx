// PÁGINA RESPONSÁVEL PELO LAYOUT DAS TABS DO  'INDEX DE DASHBOARD' E 'PÁGINA DE SETTINGS'
import { Stack, Tabs, useRouter } from "expo-router";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'


import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../src/COMPONENTS/global";

export default function Layout() {
    const router = useRouter()
    return (
        <Tabs
              screenOptions={{
                tabBarStyle: { display: 'none' }, // Remove a TabBar
                headerStyle: {
                  backgroundColor: "red", // Cor do cabeçalho
                },
                headerLeft: ({ canGoBack }) =>
                  canGoBack ? ( // Verifica se há uma página anterior
                    <TouchableOpacity onPress={() => router.back()} >
                      <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                  ) : null, // Não exibe o botão se não houver página anterior
              }}
        >
            <Tabs.Screen 
            name="avisos" 
            options={{headerShown: false}}
        />  
      </Tabs>
    )
}