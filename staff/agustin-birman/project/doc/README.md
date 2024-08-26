# Cool Steps

An app for renting and lending ladders.

![](https://media.giphy.com/media/m9pvbkBJzOY9Mt0dSm/giphy.gif?cid=790b761118teuaz0ojtj0vsytuoevmgff91t460gpic3jk80&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

Student 

-share id with teacher (view QR id) //done
-list activities //done
-view activity //done
-submit exercise answer // done
-delete progress //done
-view stats

Teacher

-add student (scan QR id) //done
-list students //done
-list activities //done
-add activity  //done
-edit activity //done
-delete activity //done
-add exercise to activity  //done
-remove exercise from activity  //done
-edit exercise from activity //done

### UI Design

[Figma](https://www.figma.com/design/FtmTtX9cZewWlv6yqsj4nu/demo-app?node-id=0-1&t=tNho9NZQl4l4RETJ-0)

## Technical

### Data Model

User
- id (auto)
- name (string)
- surname (string)
- email (string)
- password (string)
- country (string, optional)
- role (string, enum: teacher| student)

Activity
-id (auto)
-teacher (User.id)
-title (string)
-description (string, optional)

Exercise
-id (auto)
-activity (Activity.id)
-sentence (string)
-answer (string)

Answer
-id (auto)
-student (User.id)
-activity (Activity.id)
-exercise (Exercise.id)
-answer (string)