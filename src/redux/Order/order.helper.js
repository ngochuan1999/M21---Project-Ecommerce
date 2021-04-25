import { firestore } from './../../firebase/ultils'

export const handleAddOrder = data => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('order')
            .doc()
            .set(data)
            .then(() => { 
                resolve()
            })
            .catch(err => {
                reject(err);
            })
    });
}


export const handleFetchOrders = () => {
    return new Promise((resolve,reject) => {
        firestore
        .collection('order')
        .get()
        .then(snapshot => {
            const listOrder = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            });
            resolve(listOrder)
        })
        .catch(err => {
            reject(err)
        }) 
    })
}




export const handleGetUserOrderHistory = uid => {
    return new Promise((resolve, reject) => {

        console.log(uid)
        let ref = firestore.collection('order').orderBy('datePlaced');

        ref = ref.where('userID', '==' ,uid);

        ref.get()
        .then(snap => {
            const data = [
                ...snap.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID : doc.id
                    }
                })
            ];

            resolve({data})
        })
        .catch(err => {
            reject(err);
        })
    });
}

export const handleGetOrder = orderID => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('order')
            .doc(orderID)
            .get()
            .then(snap => { 
               if(snap.exists) {
                   resolve({
                       ...snap.data(),
                       documentID: orderID
                   })
               }
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleEditOrder = (product, id) => {
    return new Promise((resolve,reject) => {
        firestore.collection('order').doc(id).set(product)
        .then(() => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
        
    })
}

export const handleDeleteOrder = id => {
    return new Promise((resolve,reject) => {
        firestore.collection('order').doc(id).delete()
        .then(() => {
            resolve()
        })
        .catch(err => {
            reject(err)
        })
    } )
}