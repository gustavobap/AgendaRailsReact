class TimeSlot < ApplicationRecord

    before_create :broadcast_booking

    private

    def broadcast_booking
        ActionCable.server.broadcast("#{Date.today.strftime}_DailySlotsBooking", { time_slots: {oi: 'ola'} })
    end

end
