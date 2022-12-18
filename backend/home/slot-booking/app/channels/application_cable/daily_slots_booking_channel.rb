module ApplicationCable
  class DailySlotsBookingChannel < ApplicationCable::Channel
    def subscribed
      puts "starting stream for #{params[:room]}"
      stream_from "#{params[:room]}_DailySlotsBooking"
    end

    def unsubscribed
      puts "stopping stream for #{params[:room]}"
      stop_stream_from "#{params[:room]}_DailySlotsBooking"
    end
  end
end