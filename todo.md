1. ~~make the dash inside the game area~~
2. ~~make the dash move using a and s keys~~
3. ~~set the boundary of the dash movement, ie, the left and right walls of the game area~~
4. ~~make the ball~~
5. ~~make it move constantly~~
6. ~~give it some velocity to add or subtract every time~~
7. ~~make it bounce off if it touches~~
   1. ~~the walls of the game area~~
   2. ~~the top of the dash~~
8. ~~make the ball stop only if it touches the bottom wall of the game area~~

making the game class based!

- purpose of making a class
  so that related behaviour of some object can stay together
  and so that we can use those behaviours repeatedly for objects like that

1. distinguish the seperate elements that need their own classes
   - a ball class with properties related to the ball only like its position, velocity,etc
   - a dash class with properties like moveleft, moveright, width, moveStep
   - a game class that controls the game and manipulates the ball and dash

-- issues

- Lack of Reusability:
  If Game depends directly on getComputedStyle, you can’t reuse the class outside the browser or in non-visual environments (e.g., running simulations or headless testing).

- Limited Flexibility:
  You might want to change the way dimensions are handled — for example, allowing dynamic resizing or passing dimensions as configuration. Tight DOM coupling makes this harder.

- Separation of Concerns:
  Ideally, your game logic should be independent of how elements are rendered. The Ball, Dash, and Game should handle logic, and a separate class or method should handle rendering and DOM manipulation. This makes the code cleaner and easier to manage.
