import notificationConfig from "./notificationConfig.js";


class notificationFactory{
    static getNotifications(category){
        const notificationClass = notificationConfig[category]
        return notificationClass ? notificationClass.getData() : []
    }
}

export default notificationFactory