import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RepositoryList from "./RepositoryList";
import ContPerfil from "./contenidoPerfil";

//Con route se refiere al dato que viene como prop del login (Id del usuario)
const Perfil = ({ navigation, route }) => {
  const [dataUser, setDataUser] = useState({});
  const [userPublications, setUserPublications] = useState();

  //route.params se refiere a los parametros enviados desde el prop, en este caso el id
  //route.params es lo mismo que por ejemplo user.id
  const [userId, setUserId] = useState(route.params || undefined);

  //Verifica si el id ya existe en el storage, en caso de que no exista toma el proveniente del login
  const getDataPerfil = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("IdUser");
      //Si el id del storage ya existe lo asigna al estado userId
      if (storedUserId) {
        setUserId(storedUserId);
      }

      //si alguno de los 2 datos existe (Id del usuario) lo toma y lo usa para hacer la peticion
      if (userId || storedUserId) {
        const responseDataUser = await fetch(
          `https://backproyect-zsnb.onrender.com/usuarios?id=${
            userId?.userId || storedUserId
          }`
        );
        //Se realiza la peticion de las publicaciones que contengan el id del usuario en su informacion, para mejorar rendimiento y tener mejor manejo de la informacion
        const responsePublications = await fetch(
          `https://backproyect-zsnb.onrender.com/publicaciones?idUser=${
            userId?.userId || storedUserId
          }`
        );
        const dataUser = await responseDataUser.json();
        const dataUserPublications = await responsePublications.json();

        setDataUser(dataUser[0]);
        setUserPublications(dataUserPublications);
        console.log(dataUserPublications);
      } else {
        // Hacer algo si userId o storedUserId no existen
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //ejecuta la funcion al cargar la vista
  useEffect(() => {
    getDataPerfil();
  }, []);

  const BotonAgregar = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("agregar")}
      style={styles.boton}
    >
      <View style={styles.contenido}>
        <FontAwesome5 name="plus" size={16} color="white" />
        <Text style={styles.textoBoton}>Agregar</Text>
      </View>
    </TouchableOpacity>
  );

  const ImagenPerfil =
    "https://i.pinimg.com/736x/73/59/84/735984262fcf3c8cc89909976898ec1c.jpg";

  return (
    <>
      {/* en caso de que no exista un id y el usuario entre  perfil, no mostrara sus datos si no un mensaje indicando que se loguee */}
      {userId ? (
        <View style={{ margin: 6 }}>
          <View style={styles.container}>
            <Image source={{ uri: dataUser.imgProfile }} style={styles.image} />
            <Text style={styles.textoNom}>{dataUser.user}</Text>
            <Text style={styles.texto}>
              Cargo:{" "}
              <Text style={{ color: "#111111", fontWeight: "normal" }}>
                {dataUser.job}
              </Text>
            </Text>
            <Text style={styles.texto}>
              Area:{" "}
              <Text style={{ color: "#111111", fontWeight: "normal" }}>
                {dataUser.area}
              </Text>
            </Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <BotonAgregar />
          </View>
          <View style={styles.contenedor}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View>
                <Text style={styles.texto2}>Publicaciones:</Text>
                <RepositoryList dataPublications={userPublications} />
                <View>
                  <ContPerfil />
                  <Button
                    onPress={() => navigation.navigate("editar")}
                    title="editar"
                    color="#841584"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        <View style={{ margin: 6 }}>
          <View style={styles.container}>
            <Image source={{ uri: ImagenPerfil }} style={styles.image} />
            <Text style={styles.texto}>
              Debes Loguearte para ver los datos de tu perfil
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  contenedor: {
    overflow: "hidden",

    maxHeight: "60%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  texto: {
    color: "#01A6BD",
    fontSize: 16,
    fontWeight: "bold",
  },
  texto2: {
    color: "#5EB319",
    fontSize: 20,
    fontWeight: "bold",
  },
  textoNom: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "#5EB319",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  contenido: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Perfil;
