import axios from 'axios'

export default {
    getTables: function () {
        return new Promise((resolve, reject) => {
            axios.get('/backend/waiter/getTables').then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}