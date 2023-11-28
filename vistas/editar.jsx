import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fileUpload } from "../hooks/FileUpload";

function EditarDatos({ navigation, route }) {
  console.log(route.params.id);
  const [refreshing, setRefreshing] = React.useState(false);
  const [image, setImage] = useState(route.params.data.img);
  const [title, setTitle] = useState(route.params.data.title);
  const [content, setContent] = useState(route.params.data.content);
  const updatePublication = route.params.updatePublication;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
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

  const data = {
    id: route.params.data.id,
    idUser: route.params.data.idUser,
    title: title,
    content: content,
    img: image,
    date: route.params.data.date,
    user: route.params.data.user.user,
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollview}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          title="Refreshing Screen"
        />
      }
    >
      <View style={styles.container}>
        <ImageBackground resizeMode="cover" style={styles.Bgimage}>
          <Text style={styles.espaciado}>
            Ingresa el nuevo titulo de la publicación
          </Text>
          <TextInput
            style={styles.cajas1}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          ></TextInput>
          <Text style={styles.espaciado}>
            Ingresa el nuevo contenido de la publicación
          </Text>
          <TextInput
            style={styles.cajas2}
            placeholder="Contenido"
            value={content}
            onChangeText={setContent}
            multiline
          ></TextInput>
          <Button
            title="Seleccionar la nueva imagen desde la galeria"
            onPress={pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
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
              title="Actualizar"
              onPress={() => updatePublication(data)}
            />
            <StatusBar style="auto" />
          </View>
        </ImageBackground>
      </View>
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

export default EditarDatos;
