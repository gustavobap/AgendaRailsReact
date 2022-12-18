class TimeSlot < ApplicationRecord

    after_commit :broadcast_booking
    
    private

    def broadcast_booking
        ActionCable.server.broadcast("#{Date.today.strftime}_DailySlotsBooking", self.to_json)
    end

end
