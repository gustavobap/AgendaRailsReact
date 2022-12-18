class TimeSlot < ApplicationRecord

    after_commit :broadcast_booking

    private

    def broadcast_booking
        number_of_days = ((self.duration.max - self.duration.min)/(60*60*24)).ceil
        first_day = self.duration.min.beginning_of_day
        (0..number_of_days-1).each do |days|
            day = first_day + days.day
            ActionCable.server.broadcast("#{day.strftime("%Y-%m-%d")}_DailySlotsBooking", self.to_json)
        end
    end

end
