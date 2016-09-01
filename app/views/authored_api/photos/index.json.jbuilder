json.array!(@photos) do |photo|
  json.partial!('authored_api/photos/photo', photo: photo)
end
