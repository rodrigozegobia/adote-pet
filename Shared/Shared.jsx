import { getDoc, setDoc, updateDoc, doc } from "@firebase/firestore";
import { db } from './../config/FireBaseConfig';

const GetFavList = async (user) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
        console.error('Usuário ou email inválido');
        return null;
    }

    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        await setDoc(docRef, {
            email: user?.primaryEmailAddress?.emailAddress,
            favorites: []
        });
        return { email: user?.primaryEmailAddress?.emailAddress, favorites: [] };
    }
};

const UpdateFav = async (user, favorites) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
        console.error('Usuário ou email inválido');
        return;
    }

    const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favorites: favorites
        });
    } catch (e) {
        console.error('Erro ao atualizar favoritos:', e);
    }
};

export default {
    GetFavList,
    UpdateFav
};
