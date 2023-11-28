import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { fileUpload } from "../hooks/FileUpload";

function AgregarDatosImagen({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!data.canceled) {
      let imageFile = {
        uri: data.uri,
        type: `test/${data.uri.split(".")[1]}`,
        name: `test.${data.uri.split(".")[1]}`,
      };
      fileUpload(imageFile)
        .then((response) => {
          setImage(response);
          console.log("respuesta del CLOUDYNARY", response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Generacion de un id aleatorio UNICO que se asigna al usuario a la hora de ser registrado
  const generarId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 30; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const createPublication = async (publication) => {
    try {
      const response = await axios.post(
        "https://backproyect-zsnb.onrender.com/publicaciones",
        publication,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Publicacion creada:", data);
    } catch (error) {
      console.error("Error al crear la publicacion:", error);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    if (!image) {
      Toast.show({
        type: "error",
        text1: "Rellene todos los campos",
      });
      return;
    }

    const data = {
      id: generarId(),
      idUser: route.params.userId,
      title: title,
      content: content,
      img: image,
      date: getCurrentDate(),
      user: route.params.userName,
    };
    createPublication(data);

    Toast.show({
      type: "info",
      text1: "Publicacion creada con exito",
    });

    setTimeout(() => {
      navigation.navigate("perfil");
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground resizeMode="cover" style={styles.Bgimage}>
            <Text style={styles.espaciado}>
              Ingresa el titulo de la publicación
            </Text>
            <TextInput
              style={styles.cajas1}
              placeholder="Título"
              onChangeText={setTitle}
            ></TextInput>
            <Text style={styles.espaciado}>
              Ingresa el contenido de la publicación
            </Text>
            <TextInput
              style={styles.cajas2}
              placeholder="Contenido"
              onChangeText={setContent}
              multiline
            ></TextInput>
            <Button
              title="Seleccionar imagen desde la galeria"
              onPress={pickImage}
            />
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%", // Ajusta el ancho al 100% del contenedor
                  aspectRatio: 1, // Mantén la relación de aspecto de la imagen
                  alignSelf: "center",
                }}
                resizeMode="contain" // Ajusta el modo de redimensionamiento
              />
            )}
            <View style={styles.fixToText}>
              <Button
                color="red"
                title="Cancelar"
                onPress={() => [navigation.navigate("perfil")]}
              />
              <Button
                color="#2ECC71"
                title="Publicar"
                onPress={() => handleSubmit()}
              />
              <StatusBar style="auto" />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    align: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    backgroundColor: "white",
  },
  cajas1: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    minWidth: 300,
    maxWidth: 300,
    margin: 12,
    padding: 10,
  },
  cajas2: {
    borderWidth: 1,
    backgroundColor: "white",
    minWidth: 300,
    maxWidth: 300,
    minHeight: 200,
    margin: 12,
    padding: 10,
  },
  espaciado: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  Bgimage: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    height: 200,
    width: 200,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  scrollview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AgregarDatosImagen;
