module TimeSlotHelper

  def number_of_days duration
    span_seconds = duration.max.end_of_day - duration.min.beginning_of_day
    (span_seconds/(60*60*24)).ceil
  end

  def for_each_day duration
    first_day = duration.min.beginning_of_day
    (0..number_of_days(duration) - 1).each do |days|
      yield(first_day + days.day)
    end
  end

  def self.from_booking_json params
    start_date = Time.parse(params["start_date"])
    end_date = Time.parse(params["end_date"])
    TimeSlot.new({ duration: (start_date..end_date) })
  end

  def create_database_locks duration
    lock_days = []
    BookingDayLock.transaction do
      for_each_day(duration) do |day|
        BookingDayLock.find_or_create_by(day: day)
        lock_days << day
      end
    end
    lock_days
  end

end