# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    
    client_ip = ENV['CLIENT_IP'] 
    client_port = "#{ENV['CLIENT_PORT']}"

    if(client_ip.strip() == "*")
        origin = "*"
    else
        origin = "http://#{client_ip}"
        origin += ":#{client_port}" if(client_port != "80")
    end
    
    allow do
        origins origin
        resource '*',
            headers: :any,
            methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
end