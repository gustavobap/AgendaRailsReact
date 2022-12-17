module ApplicationCable
    class DailySlotsBookingChannel < ApplicationCable::Channel
        def subscribed
            stream_from "#{params[:room]}_DailySlotsBooking"
        end
    end
end