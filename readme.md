# About Editor X

## Break the code barrier. Build best website without any coding knowledge.

---

### `Design and build your own high-quality websites. Whether you’re promoting your business, showcasing your work, opening your store or starting a blog—you can do it all with the Editor-x website builder.`

---

#### This repo on under development mode

---

To see the design UI/UX concept follow this link-

### [NO CODE PAGE BUILDER](https://dribbble.com/shots/11152863-No-Code-web-builder)

![UI/UX](https://cdn.dribbble.com/users/1655389/screenshots/11152863/media/db7f71d623fdbd1139226f40fded84cf.png)

---

### It has two part

1. Front-end (ReactJS) part in the `builder` folder
2. Server (NodeJS) part in the `dist` folder

_All compiled files will store in `dist` folder_

## Technologies

---

### **Front-end**

```
1. ReactJS
2. Redux
3. Redux-thunk
4. Redux-batched-subscribe
5. React-beautiful-dnd
6. react-transition-group
```

`We use custom webpack setup for this project. Most of the component we build ourself for code efficiency and usability`

### **Backend**

`We didn't start yet backend development. Our first priority is complete the page builder tools`

---

## Instructions

### To compile front-end part

1. Git clone from the `repo`
2. cd `builder` folder
3. To install node packages `npm install` or `yarn install`
4. run `npm start dev` for development mode

### To run server

1. cd `dist` folder
2. To install node packages `npm install` or `yarn install`
3. run `node index.js`

`It will run the server at port 3000`

---

## Folder Sturcture

```
project
│   readme.md
│
└───builder
│   │   webpack-config.js
│   │
│   └───src
|       |
|       │______Elements (It has all custom elements for page builder. Ex. Input, Select etc.)
|       |
│       │______Components (All component for page builder)
│       │
│       │______Store (We builder some hightorder function to make redux more easy for this project)
|       |
|       |
|       |______Reducer ( All reducers and combined reducers)
|       |
|       |.......
|       .
│
└───dist
    │   index.js
    |
    |---js
    |
    |---css
```
