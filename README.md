# Trippr

[Live site here!] (https://trippr-reports.herokuapp.com/)

### Local installation

If you would like to play around with the site locally, follow the below commands:

`git clone https://github.com/tomc944/Trippr.git
 cd Trippr
 bundle install
 npm install
 rake db:migrate
 rake db:seed
 webpack --watch
 rails s`

### Description and Motivation

Trippr is an improved Trip Reporting Web Application. Most Trip Reports for climbing, backpacking, and off-route travel are posted on forums (such as SuperTopo, Mountain Project, or blogs) with in-line photos, which creates an ambiguity between the photo's information and the narrative it's referencing. Similarly, in-line photos break up the narrative of a Trip Report and can sometimes distract people from the written content. Trippr is largely inspired by Medium, an article sharing application that allows highlighting of important words, phrases, or paragraphs.

Trippr will allow authors to create reports in a large text form. Once the report has been written, the author will highlight a section of text that will be linked to a photo. After the text and highlighting are completed, the report will be published. When viewing the trip report, users can hover over the highlight and the photo will appear in a sidebar or pop-up modal - thus, there is no ambiguity between the content and the displayed photo.

Trippr was built using Rails, SQL, React.js, Flux, Webpack, and numerous npm packages

### MVP Features
- [x]  Single page auth for users
- [x]  Guests can view reports but not upload photos
- [x]  Basic CRUD for trip reports
- [x]  Basic CRUD for trip highlighting
- [x]  Intuitive image upload and display process
- [x]  Basic search for Reports (i.e. matching by title)


### Advanced Features
- [x] Advanced search for Reports (i.e. fuzzy search by title, search by tag)
- [x] User photo upload. Users that are not the author can upload their own photos associated with highlights, pending original author approval.
- [ ] Integration with Google Maps. As long as location services are enabled on users' photos, exif data can be ripped from the photo and placed as a pin on a Map.
- [ ] Integration with Instagram. Articles can be tagged with a hashtag and the author can find their own photos with that same hashtag. This will allow trip photos to be found much quicker. An API endpoint can be hit rather than manual uploads of photos. I will have to see how EXIF data is handled on Instagram.

### TODOS
- [] Style post feed with cover photo
- [] Modularize and DRY code
- [] Fix Fuzzy Search styling on collapse
- [] Make more mobile friendly
- [] Add Update and Delete functionality for authors
- [] Following other users/user profile
- [] Add tags for type of trip

## Design Docs
* [View Wireframes][views]
* [Database Schema][db]

[views]: ./docs/views.md
[db]: ./docs/db.md
