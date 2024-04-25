
import axios from '../axios'

export const apiGetSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: 'http://localhost:8080/songs',
            method: 'get',
            params: { id: sid }
        })
        resolve(response)

    } catch (error) {
        console.log(error)
        // reject(error)
    }
})
export const apiGetDetailSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: 'http://localhost:5000/api/infosong',
            method: 'get',
            params: { id: sid }
        })
        resolve(response)

    } catch (error) {
        console.log(error)
        // reject(error)
    }
})
export const apiGetDetailPlaylist = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: 'http://localhost:5000/api/detailplaylist',
            method: 'get',
            params: { id: pid }
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})


