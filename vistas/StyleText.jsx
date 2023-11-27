import React from "react";
import {Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    fila:{
        justifyContent: 'row'
    },
    text:{
        fontSize:12,
        color:'black',
    },
    bold:{
        fontWeight: 'bold',
        fontSize:20
    },
    green:{
        fontSize:15,
        color:'#5EB319'
    },
    big:{
        fontSize:50
    },
    small:{
        fontSize:14
    }
})


export default function StyledText({fila, green, bold, big, children, small}){
    let TextStyles = [
        styles.text,
        green && styles.green,
        bold && styles.bold,
        big && styles.big,
        small && styles.small,
        fila && styles.fila
    ]
    return(
        <Text style={TextStyles}>
            {children}
        </Text>
    )
}