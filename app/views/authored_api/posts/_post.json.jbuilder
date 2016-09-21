json.extract!(post, :id, :post, :title, :author_id, :photos)
json.highlights do
  json.array!(post.highlights) do |highlight|
    json.id highlight.id
    json.start_idx highlight.start_idx
    json.end_idx highlight.end_idx
    json.post_id highlight.post_id
    json.author_id highlight.author_id
    json.photos highlight.photos
  end
end
