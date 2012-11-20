---
layout: post
title: "Colors and Metatables"
date: 2012-11-20 15:06
comments: true
categories:
---
<a href="https://love2d.org/">Love2D</a>, like any good framework built for Lua, keeps it simple and to the point. So there are some things you can either implement yourself or use a third party library. If you're down with the latter, you might be interested in my color index built with metatables.
```lua
local COLORS
do
  local rgb = function(color) return color.r, color.g, color.b end
  local rgba = function(color) return color.r, color.g, color.b, color.a end
  COLORS = setmetatable({},
    {__newindex = function(t, k, v)
      v.rgb = rgb
      v.rgba = rgba
      rawset(t, k, v)
    end,

    __index = function(t, k)
      return rawget(t, k:upper())
    end})
end
COLORS.RED =    {r = 255, g = 0,   b = 0,   a = 255}
COLORS.GREEN =  {r = 0,   g = 255, b = 0,   a = 255}
COLORS.BLUE =   {r = 0,   g = 0,   b = 255, a = 255}
COLORS.WHITE =  {r = 255, g = 255, b = 255, a = 255}
COLORS.BLACK =  {r = 0,   g = 0,   b = 0,   a = 255}
COLORS.YELLOW = {r = 0,   g = 255, b = 255, a = 255}
COLORS.PURPLE = {r = 255, g = 0,   b = 255, a = 255}
```

Usage is like so:
```lua
love.graphics.setColor(COLORS.GREEN:rgb())
love.graphics.setColor(COLORS.GREEN:rgba())
```

You can also use either upper or lower cases (or a combination) to specify color names (i.e. `COLORS.GREEN:rgb == COLORS.green:rgb`). A full explanation of the code follows.<!--more-->

Firstly, we declare an empty `COLORS` variable. This is because we're going to be sandboxing to avoid unnecessary anonymous function creation and we still want to be able to access our colors outside of the sandbox. Then we start our `do` block and declare some helper functions. We can do this because they will be local to the scope of the do block and will be discarded after we exit the block on line 15.

On the fifth line is where the fun starts. We're going to assign a table to the `COLORS` variable but, before we do that, we're going to modify how the table reacts to certain things by applying a metatable to it. The `__newindex` function defines what a table does when you put something new in it. The `__index` function defines what a table does when you try to access a key that hasn't been assigned.

The `__newindex` function gets passed three arguments: the table itself, the key being assigned and the value that we're trying to assign to the key. In this case, the key is going to be a color name and the value is going to be a table of red, green, blue, and alpha values that correspond to that color. We're going to add the two helper functions that we defined earlier to the rgba table. Those helpers are now, in the context of the color table, going to let us pull the values out of that table in a way that makes sense and can be used by Love2D. Line 9 actually sets the table of color values into the color map; that is to say that it sets the value, ignoring the `__newindex` function.

The `__index` function gets passed two arguments: the table and the key being assigned. Remember, this only gets called when we're trying to access a key that hasn't been defined. In that case, we want to convert the color name to all caps and try again because we either used lowercase letters in the color name or there's an error in the code.

The rest of the snippet is just setting up some colors. Each time we set up a new color, the `__newindex` function runs, doing additional setup to the rgb map. And that's it!
