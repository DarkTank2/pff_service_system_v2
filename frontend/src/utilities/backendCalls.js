import axios from 'axios'
import Vue from 'vue'

export default {
    getTables: function () {
        return new Promise((resolve, reject) => {
            axios.get('/backend/waiter/getTables').then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },
    getCategories: function (type) {
        return new Promise((resolve, reject) => {
            var url = '/backend/waiter/getCategories/' + type
            axios.get(url).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },
    getItems: function (type, category) {
        return new Promise((resolve, reject) => {
            var url = '/backend/waiter/getItems/' + type + '/' + category
            axios.get(url).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    },
    putOrder: function (order) {
        return new Promise((resolve, reject) => {
            var url = '/backend/waiter/placeOrder'
            axios.put(url, order).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err.response.data)
            })
        })
    }
}