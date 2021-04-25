import { firestore } from './../../firebase/ultils'
export const handleFetchMessage = () => {

    return new Promise((resolve, reject) => {
        firestore.collection('feedback')
            .get()
            .then(snapshot => {
                const messageArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(messageArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleAddMessage = message => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('feedback')
            .doc()
            .set(message)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
    });
}
export const handleDeleteMessage = documentID => {
    return new Promise((resolve, reject) => {
        firestore.collection('feedback').doc(documentID).delete()
            .then(() => {
                console.log(documentID)
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
}