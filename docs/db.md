# Schema Information

## users
column name         | data type | details
--------------------|-----------|-----------------------
name                | string    | default: "", not null
email               | string    | default: "", not null
encrypted password  | string    | default: "", not null
reset pw token      | string    |
remember created at | datetime  |
reset pw sent at    | datetime  |
sign in count       | integer   | default: 0, not null
current sign in at  | datetime  |
last sign in at     | datetime  |
current sign in ip  | string    |
last sign in ip     | string    |
confirmation token  | string    |
confirmed at        | datetime  |
confirmation sent at| datetime  |
unconfirmed email   | string    |
failed attempts     | integer   | default: 0, not null
unlock token        | string    |
locked at           | datetime  |
created at          | datetime  |
updated at          | datetime  |


## posts
column name | data type | details
------------|-----------|-----------------------
post        | text      | not null
title       | string    | not null
author id   | integer   | not null
created at  | datetime  |
updated at  | datetime  |

## highlights
column name     | data type | details
----------------|-----------|-----------------------
highlight       | text      | not null
post id         | integer   | not null
created at      | datetime  |
updated at      | datetime  |
author id       | integer   | not null


## highlight_photos
column name | data type | details
------------|-----------|-----------------------
photo_id    | integer   | not null
highlight_id| integer   | not null
created at  | datetime  |
updated at  | datetime  |

## users
column name     | data type | details
----------------|-----------|-----------------------
url             | string    | not null
created at      | datetime  |
updated at      | datetime  |
post id         | integer   | not null
author id       | integer   | not null
