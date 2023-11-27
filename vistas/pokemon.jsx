import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Modal,TouchableOpacity } from 'react-native';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const results = response.data.results;
        setPokemonList(results);
      } catch (error) {
        console.error('Error al obtener la lista de Pokémon', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonPress=(pokemon)=>{
    setSelectedPokemon(pokemon);
    setModalVisible(true)
  }
  return (
    <View style={styles.cuadro}>
        <ScrollView contentContainerStyle={styles.gridContainer} style={styles.scrollView}>
            {pokemonList.map((pokemon, index) => (
                <TouchableOpacity key={index} style={styles.pokemonCard} onPress={()=>handlePokemonPress(pokemon)}>
                <Image
                    source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`}}
                    style={styles.pokemonImage}
                />
                </TouchableOpacity>
            ))}
            <Modal visible={modalVisible}animationType='slide' transparent={false}>
                <View style={styles.modalContent}>
                    <Text style={styles.pokemonName}>{selectedPokemon?.name}</Text>
                    <Image
                        source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonList.indexOf(selectedPokemon)+1}.png`}}
                        style={styles.pokemonImage}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    cuadro:{
        overflow: 'hidden',
        borderColor:'#5EB319',
        borderStyle:'solid', 
        borderWidth:3, 
        borderRadius:3, 
        maxHeight:'76.5%'
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    pokemonCard: {
      width: '30%',
      margin: 5,
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      alignItems: 'center',
    },
    pokemonName: {
      fontWeight: 'bold',
    },
    pokemonImage: {
      width: 120,
      height: 120,
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeButton: {
        marginTop: 20,
        color: 'blue',
      }
  });

export default PokemonList;
