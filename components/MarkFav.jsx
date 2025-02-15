import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet }) {
    const { user } = useUser();
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        if (user) {
            GetFav();
        }
    }, [user]);

    const GetFav = async () => {
        try {
            const result = await Shared.GetFavList(user);
            setFavList(result?.favorites || []);
        } catch (error) {
            console.error('Erro ao buscar favoritos:', error);
        }
    };

    const AddToFav = async () => {
        try {
            const updatedFavList = [...favList, pet?.id];
            await Shared.UpdateFav(user, updatedFavList);
            setFavList(updatedFavList); // Atualiza o estado local
        } catch (error) {
            console.error('Erro ao adicionar favorito:', error);
        }
    };

    const RemoveFromFav = async () => {
        try {
            const updatedFavList = favList.filter((id) => id !== pet?.id);
            await Shared.UpdateFav(user, updatedFavList);
            setFavList(updatedFavList); // Atualiza o estado local
        } catch (error) {
            console.error('Erro ao remover favorito:', error);
        }
    };

    return (
        <View>
            {favList?.includes(pet?.id) ? (
                <Pressable onPress={RemoveFromFav}>
                    <Ionicons name="heart" size={30} color="red" />
                </Pressable>
            ) : (
                <Pressable onPress={AddToFav}>
                    <Ionicons name="heart-outline" size={30} color="black" />
                </Pressable>
            )}
        </View>
    );
}
