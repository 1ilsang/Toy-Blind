exports.setMsg = (data, sendType, nickname, message, roomSeq) => {
    const msg = JSON.stringify({
        sendType: sendType || data.sendType,
        nickname: nickname || data.nickname,
        message: message || data.message,
        roomSeq: roomSeq || data.roomSeq
    });
    return msg;
};