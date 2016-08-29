# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'set'

20.times do
	Post.create!(post: 		 							Faker::Lorem.paragraph,
							title: 		 							Faker::Book.title,
							author_id: 							Faker::Number.between(1, 10))
end

100.times do
	Highlight.create(highlight: 				Faker::Hipster.sentence,
									 post_id:   				Faker::Number.between(1, 20),
									 author_id: 				Faker::Number.between(1, 10))
end

20.times do
	Photo.create(url: 									Faker::Internet::url,
							 post_id:       				Faker::Number.between(1, 20),
							 author_id:     				Faker::Number.between(1, 10))
end

array2 = (1..100).to_a.shuffle!

100.times do
	num1 = 1 + rand(20)
	num2 = array2.pop

	HighlightPhoto.create(photo_id: 		num1,
												highlight_id: num2)
end
