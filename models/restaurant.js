const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: Number,       // 좌석 번호
    isReserved: Boolean,      // 좌석 예약 상태
    reservedBy: String,      // 예약한 사용자의 정보 (사용자 ID 또는 이름)
    reservationExpiresAt: Date // 예약 만료 일자 및 시간
});

const restaurantSchema = new mongoose.Schema({
    name: String,             // 레스토랑 이름
    seats: Number,            // 좌석 수
    cuisine: String,          // 음식 종류
    location: String,         // 위치 정보
    madeBy: String,
    menu: [String],           // 메뉴 항목
    seatsStatus: [seatSchema] // 좌석 상태 정보
    // 기타 식당 정보
  });

module.exports = mongoose.model('restaurants', restaurantSchema);