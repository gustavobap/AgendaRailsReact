class TimeSlotsController < ApplicationController

  # GET /time_slots
  def index
    day = Time.parse(params[:date])
    duration = params[:duration].to_i
    if(duration <= 0)
      duration = 15
    elsif duration.minutes > TimeSlot::MAX_BOOKING_DAYS.days
      Rails.logger.debug("Capping duration #{duration}")
      duration = TimeSlot::MAX_BOOKING_DAYS * 24 * 60
    end
    start_date = day.beginning_of_day
    end_date = start_date + 1.day + duration.minutes
    booked_slots = TimeSlot.where("duration && ?", [start_date..end_date])
    render json: booked_slots.order(:duration).map(&:to_booking_json)
  end

  # POST /time_slots
  def create
    
    time_slot = TimeSlotHelper.from_booking_json(time_slot_params)
    
    if time_slot.save
      render json: time_slot.to_booking_json, status: :created, location: time_slot
    else
      render json: time_slot.errors, status: :unprocessable_entity
    end
  end

  private

  def time_slot_params
    params.require(:time_slot).permit(:start_date, :end_date)
  end

end
