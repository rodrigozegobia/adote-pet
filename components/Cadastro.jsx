import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Certifique-se de importar a configuração do Firebase

export default function CadastrarPet() {
    const [nome, setNome] = useState('');
    const [imagem, setImagem] = useState('');

    const cadastrarPet = async () => {
        if (!nome || !imagem) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            await addDoc(collection(db, "pets"), { nome, imagem });
            alert("Pet cadastrado com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <View>
            <TextInput placeholder="Nome do Pet" value={nome} onChangeText={setNome} />
            <TextInput placeholder="URL da Imagem" value={imagem} onChangeText={setImagem} />
            <Button title="Cadastrar" onPress={cadastrarPet} />
        </View>
    );
}
