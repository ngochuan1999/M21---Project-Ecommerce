import { firestore } from './../../firebase/ultils'

export const handleAddCategory = product => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('categories')
            .doc()
            .set(product)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
    });
}


export const handleFetchCategories = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('categories')
            .get()
            .then(snapshot => {
                const categoriesArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(categoriesArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}



export const handleFetchDetailCategory = (documentID) => {
    return new Promise((resolve, reject) => {
        firestore.collection('categories').doc(documentID)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    resolve({
                        ...snapshot.data(),
                        documentID: documentID
                    });
                }

            })
            .catch(err => {
                reject(err);
            })
    })
}


export const handleDeleteCategory = documentID => {
    return new Promise((resolve, reject) => {
        firestore.collection('categories').doc(documentID).delete()
            .then(() => {
                console.log(documentID)
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    })
}


export const handleEditCategory = (category, id) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('categories')
            .doc(id)
            .update(category)
            .then(() => {
                resolve()

            })
            .catch(err => {
                reject(err);
            })
    });
}