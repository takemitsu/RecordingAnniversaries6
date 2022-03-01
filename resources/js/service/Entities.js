const baseUrl = "/api/entities"
import axios from "axios";

const entity = {};

entity.pickup = async () => {
    const urlList = baseUrl + '/pickup';
    return await axios.get(urlList).then(response => response.data).catch(err => err)
}

entity.list = async () => {
    const urlList = baseUrl + '';
    return await axios.get(urlList).then(response => response.data).catch(err => err)
}

entity.save = async data => {
    const urlSave = baseUrl + '';
    return await axios.post(urlSave, data).then(res => res.data).catch(err => err)
}

entity.get = async id => {
    const urlGet = baseUrl + '/' + id;
    return await axios.get(urlGet).then(response => response.data).catch(err => err)
}

entity.put = async (id, data) => {
    const urlPut = baseUrl + '/' + id;
    return await axios.put(urlPut, data).then(res => res.data).catch(err => err)
}

entity.delete = async id => {
    const urlGet = baseUrl + '/' + id;
    return await axios.delete(urlGet).then(response => response.data).catch(err => err)
}

entity.deleteDay = async (entityId, dayId) => {
    const urlGet = baseUrl + '/' + entityId + '/days/' + dayId;
    return await axios.delete(urlGet).then(response => response.data).catch(err => err)
}

export default entity;
