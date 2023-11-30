import axios from "axios";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";

const Home = ({ loadHome, rechargeDataHome }) => {
  const [dataPublications, setdataPublications] = useState([]);

  const [fontsLoaded] = useFonts({
    Monserrat: require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOnHome, setIsOnHome] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  //realiza la peticion de las publicaciones
  const getDataPublications = async () => {
    try {
      const response = await axios.get(
        "https://backproyect-zsnb.onrender.com/publicaciones"
      );

      const data = response.data;

      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });

      setdataPublications(sortedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    //ejecuta la funcion de pedida de publicaciones y setea el estado de app.js en true para que vuelva a realizar la peticion al storage del id asignado
    loadHome(true);
    getDataPublications();
    console.log("rechargeDataHome del HOME", rechargeDataHome);
  }, [rechargeDataHome]);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <LinearGradient
        colors={["rgba(255,255,255,0.8)", "transparent"]}
        style={styles.background}
      >
        <LinearGradient
          colors={["#FFF", "#F8F8FF", "#F0F0F0F0"]}
          style={styles.centro}
        >
          <View style={[styles.cont0]}>
            <RepositoryList dataPublications={dataPublications} />
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cont0: {
    padding: 0,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  Header: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  Texto: {
    fontSize: 40,
    fontFamily: "Monserrat",
  },
  Texto2: {
    fontSize: 30,
    padding: 4,
    color: "#5EB319",
    fontFamily: "Monserrat",
  },
});

export default Home;
