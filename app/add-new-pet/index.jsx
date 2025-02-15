import { 
    View, Text, Image, TextInput, StyleSheet, ScrollView, 
    TouchableOpacity, Pressable, ToastAndroid 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';

export default function AddNewPet() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        breed: '',
        age: '',
        sex: '',
        weight: '',
        address: '',
        about: '',
        imageUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        navigation.setOptions({ headerTitle: 'Adicionar Novo Pet' });
        GetCategories();
    }, []);

    const GetCategories = async () => {
        const snapshot = await getDocs(collection(db, 'Category'));
        // Modify to include document ID as a unique identifier
        const categories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setCategoryList(categories);
    };

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

    const onSubmit = async () => {
        if (isSubmitting) return; // Impede múltiplos envios
    
        if (Object.values(formData).some(value => !value)) {
            ToastAndroid.show('Preencha todos os detalhes', ToastAndroid.SHORT);
            return;
        }
    
        setIsSubmitting(true); // Bloqueia novos envios enquanto processa
    
        try {
            await addDoc(collection(db, "Pets"), {
                ...formData,
                createdAt: new Date().toISOString()
            });
            ToastAndroid.show('Pet cadastrado com sucesso!', ToastAndroid.SHORT);
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao cadastrar pet:", error);
            ToastAndroid.show('Erro ao cadastrar pet', ToastAndroid.SHORT);
        } finally {
            setIsSubmitting(false); // Libera o botão novamente
        }
    };
    

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
                Adicionar novo pet para adoção
            </Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>URL da Imagem *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cole a URL da imagem"
                    value={formData.imageUrl}
                    onChangeText={(value) => handleInputChange('imageUrl', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome do Pet *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria *</Text>
                <Picker
                    selectedValue={formData.category}
                    style={styles.input}
                    onValueChange={(value) => handleInputChange('category', value)}
                >
                    <Picker.Item key="default" label="Selecione uma categoria" value="" />
                    {categoryList.map((category) => (
                        <Picker.Item 
                            key={category.id} 
                            label={category.name} 
                            value={category.name}
                        />
                    ))}
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Raça *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.breed}
                    onChangeText={(value) => handleInputChange('breed', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Idade *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    value={formData.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sexo *</Text>
                <Picker
                    selectedValue={formData.sex}
                    style={styles.input}
                    onValueChange={(value) => handleInputChange('sex', value)}
                >
                    <Picker.Item key="sex-default" label="Selecione o sexo" value="" />
                    <Picker.Item key="sex-male" label="Macho" value="Macho" />
                    <Picker.Item key="sex-female" label="Fêmea" value="Fêmea" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Peso *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    value={formData.weight}
                    onChangeText={(value) => handleInputChange('weight', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço *</Text>
                <TextInput
                    style={styles.input}
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sobre *</Text>
                <TextInput
                    numberOfLines={5}
                    style={styles.input}
                    multiline={true}
                    value={formData.about}
                    onChangeText={(value) => handleInputChange('about', value)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={{ fontFamily: 'outfit-medium', textAlign: 'center', color: Colors.WHITE }}>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5
    },
    input: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit'
    },
    label: {
        marginVertical: 5,
        fontFamily: 'outfit'
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 7,
        marginVertical: 10,
        marginBottom: 50
    }
});