# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
JSON.parse(File.read("db/seeds.json")).each do |seed|
    start_date = DateTime.parse(seed['start_date']).utc
    end_date = DateTime.parse(seed['end_date']).utc
    slot = { duration: (start_date..end_date) }
    TimeSlot.create!(slot)
end