import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AgregarDatosImagen from "./vistas/AgregarDatosImagen";
import Home from "./vistas/Home";
import EditarDatos from "./vistas/editar";
import LoginScreen from "./vistas/login";
import Perfil from "./vistas/perfil";

const Stack = createStackNavigator();

const CustomButonProfile = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.boton}>
    <FontAwesome5 name="user" size={16} color="white" />
  </TouchableOpacity>
);

const CustomButonBack = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.boton}>
    <FontAwesome5 name="chevron-left" size={16} color="white" />
  </TouchableOpacity>
);
const CustomButonUnlogin = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.botonC}>
    <FontAwesome5 name="power-off" size={16} color="white" />
  </TouchableOpacity>
);

const TextoSena = () => (
  <View style={styles.Header}>
    <Text style={styles.Texto}>SENA</Text>
    <Text style={styles.Texto2}>Blog</Text>
  </View>
);

export default function App() {
  const [userId, setUserId] = useState();
  const [isOnHome, setIsOnHome] = useState(false);

  const loadHome = (load) => {
    setIsOnHome(load);
  };

  //Cada vez que cambie isOnHome (login, perfil)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userIdFromStorage = await AsyncStorage.getItem("IdUser");
        setUserId(userIdFromStorage);
      } catch (error) {
        console.error("Error al obtener datos de AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, [isOnHome]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: () => <TextoSena />,
        }}
      >
        <Stack.Screen
          name="inicio"
          component={() => <Home loadHome={loadHome} />}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <CustomButonProfile
                title="volver"
                onPress={() => {
                  if (userId) {
                    navigation.navigate("perfil");
                    console.log(userId);
                  } else {
                    navigation.navigate("login");
                    console.log(userId);
                  }
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="perfil"
          component={Perfil}
          options={({ navigation }) => ({
            headerLeft: () => (
              <CustomButonBack
                title="volver"
                onPress={() => {
                  setIsOnHome(true);
                  navigation.navigate("inicio");
                }}
              />
            ),
            headerRight: () =>
              AsyncStorage.getItem("IdUser") ? (
                <CustomButonUnlogin
                  title="volver"
                  onPress={async () => {
                    await AsyncStorage.removeItem("IdUser");
                    setUserId(null);
                    navigation.navigate("login");
                  }}
                />
              ) : (
                <></>
              ),
          })}
        />
        <Stack.Screen name="agregar" component={AgregarDatosImagen} />
        <Stack.Screen name="editar" component={EditarDatos} />
        <Stack.Screen
          name="login"
          component={() => <LoginScreen loadHome={loadHome} />}
          options={({ navigation }) => ({
            headerLeft: () => (
              <CustomButonBack
                title="volver"
                onPress={() => navigation.navigate("inicio")}
              />
            ),
          })}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  boton: {
    margin: 5,
    backgroundColor: "#01A6BD",
    padding: 10,
    borderRadius: 5,
  },
  botonC: {
    margin: 5,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  textoboton: {
    color: "white",
    fontSize: 16,
  },
  Texto: {
    fontSize: 20,
  },
  Texto2: {
    fontSize: 15,
    padding: 4,
    color: "#5EB319",
  },
});
