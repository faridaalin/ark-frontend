import { showMessage } from '../helpers/showMessage.js';
import { removeMessage } from '../helpers/removeMessage.js';
import { fectData } from '../helpers/fetcData.js';



export const uploadFile = (url, token, formData) => {
    removeMessage('#msg')


    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData
    }


    const getData = async (url, options) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw ({
                    status: response.status,
                    statusText: response.statusText
                })
            }
            return await response.text();

        } catch (error) {
            console.error(error.statusText);
            return error.statusText;

        }
    };
    getData(url, options);

}

