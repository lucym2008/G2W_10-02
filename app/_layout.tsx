// PÁGINA RESPONSÁVEL PELO LAYOUT DA ANIMAÇÃO DE STACK E TOPBAR DO 'INDEX DE LOGIN'
import { Stack } from "expo-router";

export default function Layout() {
    return(
        <Stack>
            {/* STACK DA PÁGINA PRINCIPAL */}
            <Stack.Screen name="index" options={{ headerShown:false}}/>
            <Stack.Screen name="Login" options={{ headerShown:false}}/>
            <Stack.Screen name="Criar" options={{ headerShown:false}}/>
            {/* STACK DA PÁGINA COM TABBAR */}
            <Stack.Screen name="(tabs)" options={{ headerShown:false}}/>      
        </Stack>
    )
}