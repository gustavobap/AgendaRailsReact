class TimeSlot < ApplicationRecord
  include TimeSlotHelper

  MAX_BOOKING_DAYS = 7

  before_create :check_overlaping
  after_create_commit :broadcast_booking

  validate :validate_duration_max_length

  def to_booking_json
    {
      id: self.id,
      startDate: self.duration.min,
      endDate: self.duration.max
    }
  end

  private

  def broadcast_booking
    for_each_day(self.duration) do |day|
      Rails.logger.debug("broadcasting to #{day}")
      ActionCable.server.broadcast("#{day.strftime("%Y-%m-%d")}_DailySlotsBooking", self.to_booking_json)
    end
  end

  def validate_duration_max_length
    if number_of_days(self.duration) > MAX_BOOKING_DAYS
      self.errors.add(:duration, "Maximum booking time frame is #{MAX_BOOKING_DAYS} days.")
    end
  end

  def check_overlaping
    Rails.logger.debug "check_overlaping"

    lock_days = create_database_locks(self.duration)
  
    Rails.logger.debug "locking days #{lock_days.inspect}"
    BookingDayLock.transaction do
      BookingDayLock.lock("FOR UPDATE").find_by(day: lock_days)
      intersection = TimeSlot.where("duration && tsrange(?,?,'()')", self.duration.min, self.duration.max)
      unless intersection.count.zero?
        Rails.logger.debug("Booking failed " + self.inspect)
        Rails.logger.debug intersection.inspect
        self.errors.add(:duration, "Someone was faster than you !")
        throw(:abort)
      end
      Rails.logger.debug "releasing days #{lock_days.inspect}"
    end
    
  end

end
