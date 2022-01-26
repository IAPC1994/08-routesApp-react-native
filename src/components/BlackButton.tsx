import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props{
    title: string;
    onPress: () => void;
}

export const BlackButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity
        activeOpacity={ 0.9 }
        onPress={ onPress }
        style={{
            ...styles.blackButton,
        }}
    >
        <Text style={ styles.buttonText }>{ title }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    blackButton:{
        height: 50,
        width: 200,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6,
        marginVertical: 10
    },
    buttonText:{
        color: 'white',
        fontSize: 18
    }
});