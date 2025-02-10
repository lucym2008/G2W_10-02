// PÁGINA RESPONSÁVEL PELO LAYOUT DA ANIMAÇÃO DE STACK E TOPBAR DO 'INDEX DE DASHBOARD' E 'SETTINGS'
import Colors from "@/constants/Colors";
import { colors } from "@/src/COMPONENTS/global";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Layout() {
    const router = useRouter()

    return (
        <Stack>
            <Stack.Screen 
            name="dashboard" 
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen 
            name="configurações" 
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.fundo,
                },
                headerTitle: "",
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                      <TouchableOpacity
                        onPress={() => router.replace('/(tabs)/dashboard')}
                        style={{ marginLeft: 10 }} // Espaçamento opcional
                      >
                        <Ionicons name="arrow-back" size={27} color={colors.tituloBranco} />
                      </TouchableOpacity>
                    ),
            }}
            />
            <Stack.Screen 
            name="vagas" 
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.fundo,
                },
                headerTitle: "",
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                      <TouchableOpacity
                        onPress={() => router.replace('/(tabs)/dashboard')}
                        style={{ marginLeft: 10 }} // Espaçamento opcional
                      >
                        <Ionicons name="arrow-back" size={27} color={colors.tituloBranco} />
                      </TouchableOpacity>
                    ),
            }}
            />
            <Stack.Screen 
            name="avisos" 
            options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.fundo,
                },
                headerTitle: "",
                headerLeft: ({ canGoBack }) =>
                    canGoBack && (
                      <TouchableOpacity
                        onPress={() => router.replace('/(tabs)/dashboard')}
                        style={{ marginLeft: 10 }} // Espaçamento opcional
                      >
                        <Ionicons name="arrow-back" size={27} color={colors.tituloBranco} />
                      </TouchableOpacity>
                    ),
            }}
            />
        </Stack>
    )
}
