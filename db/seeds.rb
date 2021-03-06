# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

10.times do
	User.create!(username:							Faker::Internet.user_name,
							 password_digest:       Faker::Lorem.characters(32),
							 session_token:					Faker::Lorem.characters(32))
end

100.times do
	Post.create!(post: 		 							Faker::Lorem.paragraph(20,false,4),
							title: 		 							Faker::Book.title,
							author_id: 							Faker::Number.between(1, 10))
end

20.times do |i|
	post_id = i
	starter = Faker::Number.between(1,30)
	ender = starter + Faker::Number.between(1,10)
	10.times do
		Highlight.create(post_id:   				post_id,
										 author_id: 				Faker::Number.between(1, 10),
										 start_idx: 				starter,
										 end_idx: 					ender)
		starter = ender + Faker::Number.between(1,20)
		ender = starter + Faker::Number.between(1,10)
	end
end

200.times do
	Photo.create(url: 									Faker::Internet::url,
							 post_id:       				Faker::Number.between(1, 100),
							 author_id:     				Faker::Number.between(1, 10))
end

array2 = (0..99).to_a.shuffle!

100.times do
	num1 = 1 + rand(200)
	num2 = array2.pop

	HighlightPhoto.create(photo_id: 		num1,
												highlight_id: num2)
end
