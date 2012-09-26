---
layout: post
title: "Control Maps in Love2D"
date: 2012-04-06 22:28
comments: true
categories:
---
In games with even moderately complicated control schemes, evaluating keypress events can easily become a large, unwieldy case or if/else statement. What we need is a way to simplify that code, compartmentalize it so that we can easily switch control schemes with player state as necessary and minimize the amount of evaluations we need to do.
<!-- more -->

We can achieve this fairly easily by mapping specific player actions into a hash. I'll be using Lua in this example but all the concepts will stay the same for any language with functions as first class citizens.

```lua
self.control_map = {
  keyboard = {
    on_press = {
      up = function() if self.on_ground then self.velocity.y = -400 end end
    },
    on_release = {
    },
    on_update = {
      right = function() self.velocity.x = 200 end,
      left = function() self.velocity.x = -200 end
    }
  }
}
```

I've split the keyboard input further into the sections where it will be referenced: on a key press, on a key release and whenever the player is updated. In this example, `self` refers to the player as, in this state, keyboard input only controls the player so I've given it the player's context so that's it's easier to work with. It could just as easily be given the game's context, if necessary.

```lua
function Main.keypressed(key, unicode)
  local action = game.player.control_map.keyboard.on_press[key]
  if type(action) == "function" then action() end
end

function PlayerCharacter:update(dt)
  for key, action in pairs(self.control_map.keyboard.on_update) do
    if love.keyboard.isDown(key) then action() end
  end
end
```

These are the parts of the code that actually trigger the actions mapped to those keys. It's much more efficient that a large if/else and, I think, easier to manage.
