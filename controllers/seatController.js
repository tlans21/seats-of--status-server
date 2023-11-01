const Restaurant = require('../models/restaurant.js');


// 음식점 클릭시 현재 자리 현황

exports.updateRestaurant = async (req, res) => {
    const { restaurantName, seatNumber, date, time} = req.body;
    const email = req.email;
    console.log("사용자 확인");
    const numberOnly = seatNumber.match(/\d+/);
    var extractedNumber;
    if(numberOnly){
        extractedNumber = parseInt(numberOnly[0], 10);
    }
    console.log(restaurantName, extractedNumber, date, time);
    try {
        
        const restaurant = await Restaurant.findOne({ name: restaurantName });
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }
    

        const seat = restaurant.seatsStatus.find(s => s.seatNumber === extractedNumber);
        if (!seat) {
          return res.status(404).json({ message: 'Seat not found' });
        }

        const reservationDate = new Date(date + 'T' + time);
        const reservationExpiresAt = new Date(reservationDate);
        // 좌석을 사용 불가능하게 업데이트
        seat.isReserved = true;
        seat.reservedBy = email;
        seat.reservationExpiresAt = null;
    
        await restaurant.save();
    
        res.status(200).json({ message: "seatsStatus update success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating seat status' });
    }
};

exports.createRestaurant = async(req, res) => {
    const {restaurantName} = req.body;

    try{
        
        const restaurant = await Restaurant.findOne({ name : restaurantName});
        console.log(restaurantName);
        console.log(req.email);
        // 만약 식당이 있다면 넘어가고
        if(restaurant){
            console.log("이미 존재하고있는 컬렉션");
            res.send("존재하고 있는 컬렉션");
        }else{
            const newRestaurant = new Restaurant({
                name: restaurantName,             
                seats: 16, 
                madeBy: req.email,                    
                seatsStatus: [],       
            });

            for (let i = 1; i <= newRestaurant.seats; i++){
                newRestaurant.seatsStatus.push({
                    seatNumber: i,
                    isReserved: false,
                    reservedBy: null,
                    reservationExpiresAt: null,
                });
            }

            await newRestaurant.save();

            res.status(200).json({ message: 'Restaurant and seat status created successfully' });
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error creating restaurant and seat status' });
    }
}

exports.readRestaurant = async(req, res) => {
    const {restaurantName} = req.body;
    console.log(restaurantName);
    try {
        // 식당 정보 조회
        const restaurant = await Restaurant.findOne({ name: restaurantName });

        if (!restaurant) {
            res.status(404).json({ message: 'Restaurant not found' });
            return;
        }

        // 해당 식당의 테이블 정보 조회
        const seatsStatus = restaurant.seatsStatus;
        console.log({seatsStatus});
        res.status(200).json({seatsStatus});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching restaurant collections' });
    }
}
