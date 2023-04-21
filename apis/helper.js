const client = require("./whatsapp");

const phoneNumberFormatter = phoneNumber => {
    let formatted = phoneNumber.replace(/\D/g, '');
    if (formatted.startsWith('0')) {
        formatted = '62' + formatted.substr(1);
    }

    if (!formatted.endsWith('@c.us')) {
        formatted += '@c.us'
    }

    return formatted;
}

const userCheck = async (phoneNumber) => {
    const isRegistered = await client.isRegisteredUser(phoneNumber);
    return isRegistered;
}

module.exports = {
    phoneNumberFormatter,
    userCheck
}