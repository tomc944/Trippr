json.array!(@highlights) do |highlight|
  json.partial!('authored_api/highlights/highlight', highlight: highlight)
end
