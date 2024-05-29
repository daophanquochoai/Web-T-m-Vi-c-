const AnnounceModel = require("../models/Announce.model");

module.exports = () => {
    _io.once("connection", async (socket) => {
        console.log("Kết nối socket thành công!");

        socket.on("USER_CLICK_ANNOUNCE_NOTSEEN",async (data) => {
            console.log(data);
            
            // cập nhật trạng thái đã xem của thông báo này
            await AnnounceModel.updateAnnounce(parseInt(data.maCV), parseInt(data.userId));

            // trả ra giao diện realtime
        })
    });
}