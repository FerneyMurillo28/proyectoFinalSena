import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen({ loadHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState(false);
  const navigation = useNavigation();
  const [dataUsers, setdataUsers] = useState([]);

  useEffect(() => {
    login();
    loadHome(false);
  }, []);

  //Funcion de logueo con Email & Password
  const login = async () => {
    try {
      const response = await axios.get(
        "https://backproyect-zsnb.onrender.com/usuarios"
      );
      const data = response.data;
      setdataUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePublication = async (IdPublication, dataPublication) => {
    console.log("Funcion", route.params.data.id, dataPublication);

    try {
      console.log(
        `URL de la solicitud PUT: http://localhost:3000/publicaciones/${route.params.data.id}`
      );
      const response = await axios.put(
        `http://localhost:3000/publicaciones/${route.params.data.id}`,
        dataPublication,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Usuario actualizado:", data);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  //Se filtra los datos de la api y se asignan a dataVerification
  //Se asigna el dato filtrado del al storage del telefono
  //en caso de que el usuario si exista y se verifique se asigna el id del user al storage para tenerlo global y trabajar con el
  //Luego me redirige a perfil, enviandole tambien el id del user
  const handleSubmit = async () => {
    const dataVerification = dataUsers.find(
      (data) => data.email === email && data.password === password
    );
    if (dataVerification) {
      await AsyncStorage.setItem("IdUser", `${dataVerification.id}`);
      navigation.navigate("perfil", { userId: dataVerification.id });
    } else {
      Toast.show({
        type: "error",
        text1: "Email o Contraseña incorrectos",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {messageError && <p>Un dato ingresado es incorrecto</p>}
      <Button title="Iniciar Sesión" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
