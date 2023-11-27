import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Input, StyleSheet, Text, TextInput, View, Button, Alert, ImageBackground, ScrollView, RefreshControl, Image, InputAccessoryView  } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


function AgregarDatosImagen({navigation}){

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);
  
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState([]);
    
    async function pickImage() {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await uploadImage(result.assets[0].uri, "image");
      }
    }

  return(
  <ScrollView contentContainerStyle={styles.scrollview}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title='Refreshing Screen'/>
  }
  >
    <View style={styles.container}>
      <ImageBackground 
        resizeMode='cover' 
        style={styles.Bgimage}
      >
        <Text style={styles.espaciado}>Ingresa el titulo de la publicación</Text>
        <TextInput style={styles.cajas1} placeholder="Título" onChangeText={(value) => handleChangeText('titulo', value)}></TextInput>
        <Text style={styles.espaciado}>Ingresa el contenido de la publicación</Text>
        <TextInput style={styles.cajas2} placeholder="Contenido" onChangeText={(value) => handleChangeText('cuerpo', value)}   multiline></TextInput>
        <Button
          title='Seleccionar imagen desde la galeria'
          onPress={pickImage}
        />
        {image && (<Image source={{uri: image}} style={{width: 200, height: 200, alignSelf: 'center'}}/> )}
        <View style={styles.fixToText}>
          <Button
            color='red'
            title="Cancelar"
            onPress={() => [
              navigation.navigate('perfil')
            ]}
          />
          <Button
            color='#2ECC71'
            title="Publicar"
            onPress={() => [
              navigation.navigate('perfil')
            ]}
          />
          <StatusBar style='auto' />
        </View>
      </ImageBackground>
    </View>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    align: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: 'white',
  },
  cajas1: {
    borderWidth: 1,
    backgroundColor: 'white',
    height : 40,
    minWidth: 300,
    maxWidth: 300,
    margin: 12,
    padding: 10,
  },
  cajas2: {
    borderWidth: 1,
    backgroundColor: 'white',
    minWidth: 300,
    maxWidth: 300,
    minHeight: 200,
    margin: 12,
    padding: 10,
  },
  espaciado: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  Bgimage: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 200,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  scrollview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AgregarDatosImagen;