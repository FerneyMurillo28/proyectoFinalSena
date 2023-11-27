import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import StyledText from "./StyleText";

const AlturaRandom = () => {
  return Math.floor(Math.random() * (500 - 250 + 1) + 200);
};
const ContainerAltura = AlturaRandom();

const RepositoryItem = (data) => {
  const [status, setStatus] = useState({});
  const video = React.useRef(null);

  return (
    <View key={data.id} style={[styles.contenedor]}>
      <View>
        <View style={styles.SpaceContainer}>
          <StyledText bold>{data.title}</StyledText>
          <View style={styles.container}>
            <StyledText green>{data.date}</StyledText>
            <Text> • </Text>
            <Ionicons name="earth" size={15} color="grey" />
          </View>
          <View style={styles.texto1}>
            <StyledText small>{data.content}</StyledText>
          </View>
        </View>
        <Image style={styles.image} source={{ uri: data.img }}></Image>
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
