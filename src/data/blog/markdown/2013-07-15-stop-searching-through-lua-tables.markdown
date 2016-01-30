I had this conversation with someone on reddit the other day and thought it might make a useful blog post.

tl;dr stop searching through Lua tables. There are very few instances where you should be using a `for` loop to look for a particular element in a Lua table. Instead, you should be using some kind of identifying information as the key and element as the value in the table.

For example, in LÖVE, the physics collision callbacks return three things: 2 fixtures (physics elements) and a contact (an object representing containing collision information). Lets say you've set up your physics and your collision callbacks and everything is working. But fixtures probably aren't the object you want to operate on when there's a collision happening. You probably want the body that owns that fixture or maybe even some other table that owns that body! You now have three options:

1) You can loop through every body in your game and check its fixtures until you find the ones you've just had collide. This is simple and easy to understand but it's going to get pretty slow when you've got a lot of object colliding often. You probably need something speedier.
```lua
function on_collide(fixture_a, fixture_b, contact)
  local body_a, body_b = nil, nil

  for _, body in ipairs(World:getBodyList()) do
    for _, fixture in ipairs(body:getFixtureList()) do
      if fixture == fixture_a then
        body_a = body
      elseif fixture == fixture_b then
        body_b = body
      end
    end

    if body_a ~= nil and body_b ~= nil then
      break
    end
  end
end
```

2) You can use <a href="https://www.love2d.org/wiki/Fixture:setUserData">Fixture:setUserData</a> and set the user data as whatever parent element you want. This is a fast solution but it's not a pattern that we can follow everywhere and it's not immediately obvious that fixture user data should always be physics bodies. This is good but we can do better.
```lua
function on_collide(fixture_a, fixture_b, contact)
  local body_a = fixture_a:getUserData()
  local body_b = fixture_b:getUserData()
end
```

3) The best way is have another table that uses the fixtures as the key and a parent element as the value. You'll have to manually clean up these references if you destroy the fixture but it's fast and something that you have complete control over, unlike the user data method.
```lua
local objects = {}

function createObj()
  local object = {
    body = love.physics.newBody(world, x, y, "dynamic"),
    shape = love.physics.newRectangleShape(x,y),
    otherinfo = 123,
    otherinfo2 = 321
  }
  object.fixture = love.physics.newFixture(object.body, object.shape)
  objects[object.fixture] = object
end

function on_collide(fixture_a, fixture_b, contact)
  local object_a = objects[fixture_a]
  local object_b = objects[fixture_b]
end
```

This type of pattern is something that you can use everywhere and generally cuts down your operation complexity from O(n) to O(1). The only time you can't use this is if you absolutely need the elements to be ordered or if you need to know the size of the list. Every other time you should strongly consider using a hash in this pattern.
