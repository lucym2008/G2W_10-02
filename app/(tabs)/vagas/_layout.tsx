import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' }, // Remove a TabBar
        headerStyle: {
          backgroundColor: "red", // Cor do cabeçalho
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? ( // Verifica se há uma página anterior
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ) : null, // Não exibe o botão se não houver página anterior
      }}
    >
      <Tabs.Screen
        name="CLT"
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="Freelancer"
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="VagasEmprego"
        options={{headerShown: false}}
      />
      <Tabs.Screen
        name="main"
        options={{headerShown: false}}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    padding: 5,
  },
});
