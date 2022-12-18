class CreateTimeSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :time_slots do |t|
      t.tsrange :duration, null: false, index: true
    end
  end
end
