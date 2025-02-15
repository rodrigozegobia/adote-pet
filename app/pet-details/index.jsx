import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import PetInfo from '../../components/Home/PetDetails/PetInfo';
import PetSubInfo from '../../components/Home/PetDetails/PetSubInfo';
import AboutPet from '../../components/Home/PetDetails/AboutPet';
import OwnerInfo from '../../components/Home/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';

export default function PetDetails() {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        console.log(pet.id);
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    const handleAdopt = async () => {
        try {
            // Confirma se temos o ID do pet
            if (!pet.id) {
                ToastAndroid.show('ID do pet não encontrado', ToastAndroid.SHORT);
                return;
            }

            // Referência ao documento do pet
            const petRef = doc(db, 'Pets', pet.id);

            // Deleta o documento
            await deleteDoc(petRef);

            // Mostra mensagem de sucesso
            ToastAndroid.show('Pet adotado com sucesso!', ToastAndroid.SHORT);

            // Navega de volta para a tela anterior
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao adotar pet:", error);
            ToastAndroid.show('Erro ao adotar pet', ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <PetInfo pet={pet} />
                <PetSubInfo pet={pet} />
                <AboutPet pet={pet} />
                <OwnerInfo pet={pet} />
                <View style={{ height: 70 }} />
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity 
                    style={styles.adoptBtn}
                    onPress={handleAdopt}
                >
                    <Text style={styles.adoptBtnText}>ADOTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    adoptBtn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 8,
        marginHorizontal: 10,
        marginBottom: 10
    },
    adoptBtnText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 20,
        color: Colors.WHITE
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: 'white',
        paddingTop: 10
    }
})