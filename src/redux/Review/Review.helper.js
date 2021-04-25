import { firestore } from "../../firebase/ultils";

export const handleAddReview = (review,id) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(id)
            .update(review)
            .then(() => {
                resolve() 
            })
            .catch(err => {
                reject(err);
            })
    });
}


export const handleAddReply = (review,id) => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('products')
            .doc(id)
            .update(review)
            .then(() => {
                resolve() 
            })
            .catch(err => {
                reject(err);
            })
    });
}

export const handleFetchReviews = (documentID) => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(documentID)
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