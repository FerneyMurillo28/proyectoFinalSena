import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import StyledText from "./StyleText";

const AlturaRandom = () => {
  return Math.floor(Math.random() * (500 - 250 + 1) + 200);
};
const ContainerAltura = AlturaRandom();

const RepositoryItem = ({
  id,
  idUser,
  title,
  content,
  img,
  date,
  user,
  isOnProfile,
}) => {
  const navigation = useNavigation();

  const deletePublication = async (id) => {
    try {
      const response = await axios.delete(
        `https://backproyect-zsnb.onrender.com/publicaciones/${id}`
      );

      console.log("Publicación eliminada:", response.data);
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };

  const updatePublication = async (dataPublication) => {
    console.log("Funcion", id, dataPublication);

    try {
      console.log(
        `URL de la solicitud PUT: https://backproyect-zsnb.onrender.com/publicaciones/${id}`
      );
      const response = await axios.put(
        `https://backproyect-zsnb.onrender.com/publicaciones/${id}`,
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

  return (
    <View key={id} style={[styles.contenedor]}>
      <View>
        <View style={styles.SpaceContainer}>
          <StyledText bold>{title}</StyledText>
          <View style={styles.container}>
            <StyledText green>{date}</StyledText>
            <Text> • </Text>
            <Ionicons name="earth" size={15} color="grey" />
          </View>
          <View style={styles.texto1}>
            <StyledText small>{content}</StyledText>
          </View>
        </View>
        <Image style={styles.image} source={{ uri: img }}></Image>
        {isOnProfile === true ? (
          <>
            <Button
              onPress={() =>
                navigation.navigate("editar", {
                  data: { id, idUser, title, content, img, date, user },
                  updatePublication: updatePublication,
                })
              }
              title="editar"
              color="#841584"
            />
            <Button
              onPress={() => deletePublication(id)}
              title="borrar"
              color="#841584"
            />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 0, // Padding centrado alrededor del contenido interno
    borderRadius: 20, // Borde circular
    backgroundColor: "white", // Color de fondo para visualizar el efecto
    margin: 10,
    alignSelf: "center",
  },
  contenImportante: {
    height: ContainerAltura,
  },
  SpaceContainer: {
    borderRadius: 5,
    padding: 20,
    paddingBottom: 5,
    paddingTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    height: null,
    aspectRatio: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  texto1: {
    paddingVertical: 6,
  },
  video: {
    width: "100%",
    height: null,
    aspectRatio: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RepositoryItem;
