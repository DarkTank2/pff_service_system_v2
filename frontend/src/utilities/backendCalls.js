import axios from 'axios'
import Vue from 'vue'

function getObjOfArray (identifier, value, array) {
    var retVal = array.find(item => item[identifier] === value)
    if (retVal === undefined) {
        retVal = {}
        retVal[identifier] = value
        array.push(retVal)
    }
    return retVal
}

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
    },
    getNotFinished: function (type) {
        return new Promise((resolve, reject) => {
            var url = '/backend/buffet/getNotFinished/' + type
            axios.get(url).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateFinished: function (type, id, value) {
        return new Promise((resolve, reject) => {
            var url = '/backend/buffet/updateFinished/' + id + '/' + type
            var body = {
                value
            }
            axios.post(url, body).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getItemsDepletion: function (type) {
        return new Promise((resolve, reject) => {
            var url = 'backend/buffet/getItems/' + type
            axios.get(url).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateDepletion: function (id, type, value) {
        return new Promise((resolve, reject) => {
            var url = 'backend/buffet/updateDepletion/' + id + '/' + type
            var body = {
                value
            }
            axios.post(url, body).then(data => {
                resolve(data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getServantTables: function (type) {
        return new Promise((resolve, reject) => {
            var promises = []
            var tables = []
            promises.push(new Promise((res, rej) => {
                axios.get('/backend/servant/getNotServedTables/' + type).then(data => {
                    data.data.forEach(dati => {
                        if (dati.food) {
                            dati.food.forEach(table => {
                                var copy = getObjOfArray('idTisch', table.idTisch, tables)
                                copy.Number = table.Number
                                copy.notServed = true
                                copy.food = true
                            })
                        } else if (dati.drinks) {
                            dati.drinks.forEach(table => {
                                var copy = getObjOfArray('idTisch', table.idTisch, tables)
                                copy.Number = table.Number
                                copy.notServed = true
                                copy.drinks = true
                            })
                        }
                    })
                    res()
                }).catch(err => {
                    rej(err)
                })
            }))
            promises.push(new Promise((res, rej) => {
                axios.get('/backend/servant/getNotCashedTables/' + type).then(data => {
                    data.data.forEach(dati => {
                        if (dati.food) {
                            dati.food.forEach(table => {
                                var copy = getObjOfArray('idTisch', table.idTisch, tables)
                                copy.Number = table.Number
                                copy.notCashed = true
                                copy.food = true
                            })
                        } else if (dati.drinks) {
                            dati.drinks.forEach(table => {
                                var copy = getObjOfArray('idTisch', table.idTisch, tables)
                                copy.Number = table.Number
                                copy.notCashed = true
                                copy.drinks = true
                            })
                        }
                    })
                    res()
                }).catch(err => {
                    rej(err)
                })
            }))
            Promise.all(promises).then(() => {
                tables.sort((a, b) => a.idTisch - b.idTisch)
                resolve(tables)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getItemsByTable: function (type, tableId) {
        return new Promise((resolve, reject) => {
            var promises = []
            var items = {
                notServed: [],
                notCashed: {
                    food: [],
                    drinks: []
                }
            }
            promises.push(new Promise((res, rej) => {
                axios.get('/backend/servant/getNotServedItemsByTable/' + type + '/' + tableId).then(data => {
                    data.data.forEach(dati => {
                        if (dati.food) {
                            dati.food.forEach(item => {
                                var orderCopy = getObjOfArray('idBestellung', item.idBestellung, items.notServed)
                                orderCopy.Kellner = item.Kellner
                                if (!orderCopy.food) orderCopy.food = []
                                var itemCopy = getObjOfArray('NAME', item.NAME, orderCopy.food)
                                itemCopy.Stueck = item.Stueck
                                itemCopy.served = item.served
                                itemCopy.cashed = item.cashed
                                itemCopy.price = item.price
                            })
                        }
                        if (dati.drinks) {
                            dati.drinks.forEach(item => {
                                var orderCopy = getObjOfArray('idBestellung', item.idBestellung, items.notServed)
                                orderCopy.Kellner = item.Kellner
                                if (!orderCopy.drinks) orderCopy.drinks = []
                                var itemCopy = getObjOfArray('NAME', item.NAME, orderCopy.drinks)
                                itemCopy.Stueck = item.Stueck
                                itemCopy.served = item.served
                                itemCopy.cashed = item.cashed
                                itemCopy.price = item.price
                            })
                        }
                    })
                    res()
                }).catch(err => {
                    rej(err)
                })
            }))
            promises.push(new Promise((res, rej) => {
                axios.get('/backend/servant/getNotCashedItemsByTable/' + type + '/' + tableId).then(data => {
                    data.data.forEach(dati => {
                        if (dati.food) items.notCashed.food = dati.food
                        if (dati.drinks) items.notCashed.drinks = dati.drinks
                        items.notCashed.food.forEach(item => {
                            item.selected = 0
                        })
                        items.notCashed.drinks.forEach(item => {
                            item.selected = 0
                        })
                    })
                    res()
                }).catch(err => {
                    rej(err)
                })
            }))
            Promise.all(promises).then(() => {
                resolve(items)
            }).catch(err => {
                reject(err)
            })
        })
    },
    serveOrder: function (type, orderId, value) {
        return new Promise((resolve, reject) => {
            var url = '/backend/servant/updateServed/' + orderId + '/' + type
            var body = {
                value
            }
            axios.post(url, body).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    cashOrder: function (type, orderId) {
        return new Promise((resolve, reject) => {
            this.cashItemByOrder('all', 'Stueck', orderId, type).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    cashItemByOrder: function (item, value, orderId, type) {
        return new Promise((resolve, reject) => {
            var url = '/backend/servant/updateCashed/' + orderId + '/' + type
            var body = {
                item,
                value
            }
            axios.post(url, body).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}