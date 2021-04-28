import { firestore } from '../../../lib/firebase.js';

export default (req, res) => {
    firestore
        .collection('images')
        .doc(req.query.name)
        .get()
        .then((doc) => {
            res.json(doc.data())
        })
        .catch((error) => {
            res.json({ error })
        })
}