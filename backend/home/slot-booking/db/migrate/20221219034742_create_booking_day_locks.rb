class CreateBookingDayLocks < ActiveRecord::Migration[7.0]
  def change
    create_table :booking_day_locks do |t|
      t.timestamp :day, null: false, unique: true
    end
  end
end
