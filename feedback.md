Your database is really nicely set up. I love how you set up the SQL relations. I also like that you've used multiple entry points in your webpack.config. It shows that you're taking what you're learning in the curriculum and building on it, which is the sign of a great developer.

However... this doesnt actually work. In `main/main.js` where you use `content.appendChild()`, `content` is undefined. None of this ends up rendering. It's good practice to always double check right before you push new code that the main functionality still works.

I made a couple other comments in the src/index.js  and the src/main/main.js files.

Add `/dist` to your gitignore since its code you didnt write.
