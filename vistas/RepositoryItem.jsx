import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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
  refreshPublications,
}) => {
  const CustomButonDelete = ({ onPress }) => (
    <TouchableOpacity
      onPress={() => {
        onPress(); // Llama a la función onPress proporcionada
        refreshPublications();
      }}
      style={styles.botonC}
    >
      <FontAwesome5 name="trash" size={16} color="white" />
    </TouchableOpacity>
  );
  const CustomButonActu = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.botonA}>
      <FontAwesome5 name="edit" size={16} color="white" />
    </TouchableOpacity>
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const deletePublication = async (id) => {
    try {
      const response = await axios.delete(
        `https://backproyect-zsnb.onrender.com/publicaciones/${id}`
      );

      console.log("Publicación eliminada:", response.data);
      refreshPublications();
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={{
              width: "100%", // Ajusta el ancho al 100% del contenedor
              aspectRatio: 1, // Mantén la relación de aspecto de la imagen
              alignSelf: "center",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            resizeMode="cover"
            source={{ uri: img }}
          ></Image>
        </TouchableOpacity>
        {isOnProfile === true ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CustomButonActu
              onPress={() =>
                navigation.navigate("editar", {
                  data: { id, idUser, title, content, img, date, user },
                  refreshPublications: refreshPublications,
                })
              }
              title="editar"
              color="#841584"
            />
            <CustomButonDelete
              onPress={() => {
                deletePublication(id);
                Toast.show({
                  type: "error",
                  text1: "Publicacion Eliminada",
                });
              }}
              title="borrar"
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: img }}
            style={styles.modalImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#5EB319",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  botonC: {
    margin: 5,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  botonA: {
    margin: 5,
    backgroundColor: "#5EB319",
    padding: 10,
    borderRadius: 5,
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
  imagess: {
    width: "100%", // Ajusta el ancho al 100% del contenedor
    aspectRatio: 1, // Mantén la relación de aspecto de la imagen
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
