class TimeSlotsController < ApplicationController
  before_action :set_time_slot, only: %i[ show update destroy ]

  # GET /time_slots
  def index
    day = DateTime.parse(params[:date]).utc
    booked_slots = TimeSlot.where("duration && ?", [day.beginning_of_day..day.end_of_day])
    
    booked_slots = booked_slots.order(:duration).map do |slot|
      {
        id: slot.id,
        start_date: slot.duration.min,
        end_date: slot.duration.max
      }
    end

    render json: booked_slots
  end

  # GET /time_slots/1
  def show
    TimeSlot.create!(start_date: DateTime.now, end_date: DateTime.now)
    render json: {}
  end

  # POST /time_slots
  def create
    @time_slot = TimeSlot.new(time_slot_params)

    if @time_slot.save
      render json: @time_slot, status: :created, location: @time_slot
    else
      render json: @time_slot.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /time_slots/1
  def update
    if @time_slot.update(time_slot_params)
      render json: @time_slot
    else
      render json: @time_slot.errors, status: :unprocessable_entity
    end
  end

  # DELETE /time_slots/1
  def destroy
    @time_slot.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_time_slot
      @time_slot = TimeSlot.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def time_slot_params
      params.require(:time_slot).permit(:start_date, :end_date)
    end
end
