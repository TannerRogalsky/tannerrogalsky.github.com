---
layout: post
title: "My Favourite Lua Libraries"
date: 2012-09-19 14:06
comments: true
categories:
---
I really like a Lua as a programming language for a variety of reasons. It is probably my favourite language for prototyping and just messing around with. However one of the pain points I hear people talk about often is the minimal standard library that comes with the interpreter. Perhaps to alleviate some of that frustration but mostly just to talk about some libraries that I think are really cool, I wanted to put together a list of my favourite 5 Lua libs. Many of them are very general but some of them are more geared toward game development since that tends to be what I use Lua for.<!--more-->

## MiddleClass
<a href="https://github.com/kikito/middleclass">MiddleClass</a> is an OOP library. It's straight-forward and gives a lot of the OO features that you would probably want in a library like this including static methods, subclassing, mixins and various helpers.

```lua
require 'middleclass'

Person = class('Person') --this is the same as class('Person', Object) or Object:subclass('Person')
function Person:initialize(name)
  self.name = name
end
function Person:speak()
  print('Hi, I am ' .. self.name ..'.')
end

AgedPerson = class('AgedPerson', Person) -- or Person:subclass('AgedPerson')
AgedPerson.static.ADULT_AGE = 18 --this is a class variable
function AgedPerson:initialize(name, age)
  Person.initialize(self, name) -- this calls the parent's constructor (Person.initialize) on self
  self.age = age
end
function AgedPerson:speak()
  Person.speak(self) -- prints "Hi, I am xx."
  if(self.age < AgedPerson.ADULT_AGE) then --accessing a class variable from an instance method
    print('I am underaged.')
  else
    print('I am an adult.')
  end
end

local p1 = AgedPerson:new('Billy the Kid', 13) -- this is equivalent to AgedPerson('Billy the Kid', 13) - the :new part is implicit
local p2 = AgedPerson:new('Luke Skywalker', 21)
p1:speak()
p2:speak()
```

```
Hi, I'm Billy the Kid.
I am underaged.
Hi, I'm Luke Skywalker.
I am an adult.
```

## Busted
<a href="http://olivinelabs.com/busted/">Busted</a> is a unit testing framework. Easily the best one I've seen for Lua. It's well-documented, flexible and very fully-featured, even supporting alternative language packs. It has several assert styles, object introspection, mocks and spies and error trapping, oh my! If you're used to writing unit tests with any other framework, this will probably not be a big leap for you.

```lua
require("busted")

describe("Busted unit testing framework", function()
  describe("should be awesome", function()
    it("should be easy to use", function()
      assert.truthy("Yup.")
    end)

    it("should have lots of features", function()
      -- deep check comparisons!
      assert.are.same({ table = "great"}, { table = "great" })

      -- or check by reference!
      assert.are_not.equal({ table = "great"}, { table = "great"})

      assert.true(1 == 1)
      assert.falsy(nil)
      assert.has.error(function() error("Wat") end, "Wat")
    end)

    it("should provide some shortcuts to common functions", function()
      assert.are.unique({ { thing = 1 }, { thing = 2 }, { thing = 3 } })
    end)

    it("should have mocks and spies for functional tests", function()
      local thing = require("thing_module")
      spy.spy_on(thing, "greet")
      thing.greet("Hi!")

      assert.spy(thing.greet).was.called()
      assert.spy(thing.greet).was.called_with("Hi!")
    end)
  end)
end)
```

## Hardon Collider
The collision library with the juvenile name, <a href="https://github.com/vrld/HardonCollider">Hardon Collider</a> is nevertheless great at what it does. I tend to hate physics libraries that try to do too much for you which is why I love this one. You provide callbacks for when objects collide and stop colliding and it handles everything else using a nifty technique called "spatial hashes" (which is to say that it only checks for collisions between objects that are close to each other in the collider space). The callbacks get passed the time delta, the two physics objects and how far they would have to move to resolve the collision. It makes it really easy to offload the collision handling into the game objects themselves thereby compartmentalizing your code really nicely. For example, here's the entirety of the collision callback for [Gridphreak].

```lua
function Main.on_start_collide(dt, shape_one, shape_two, mtv_x, mtv_y)
  local object_one, object_two = shape_one.parent, shape_two.parent

  if type(object_one.on_collide) == "function" then
    object_one:on_collide(dt, shape_one, shape_two, mtv_x, mtv_y)
  end

  if type(object_two.on_collide) == "function" then
    object_two:on_collide(dt, shape_two, shape_one, -mtv_x, -mtv_y)
  end
end
```

## Cron.lua
<a href="https://github.com/kikito/cron.lua">cron.lua</a> are a set of functions for executing actions at a certain time interval and it is amazing. Put a single reference to `cron.update(dt)` in your game loop and then just execute callback functions whenever you want complete with Lua's super powerful scoping. You can build entire games with this thing; it is really nice.

```lua
local cron = require 'cron'

local function printMessage()
  print('Hello')
end

-- the following calls are equivalent:
cron.after(5, printMessage)
cron.after(5, print, 'Hello')

cron.update(5) -- will print 'Hello' twice

-- this will print the message periodically:
local id = cron.every(10, printMessage)

cron.update(5) -- nothing
cron.update(4) -- nothing
cron.update(12) -- prints 'Hello' twice

cron.cancel(id) -- stops the execution the element defined by id. Works with periodical or one-time actions.

cron.reset() -- stops all the current actions, both timed ones and periodical ones.
```

## Inspect.lua

<a href="https://github.com/kikito/inspect.lua">Inspect.lua</a> is a really simple tool for debugging the contents of tables. It's the kind of thing that might even be cool to implement just for the learning but this one is pretty nice. Every project of any decent size is probably going to wish for something like this at some point.
```lua
inspect({a={b=2}}) = [[<1>{
  a = <2>{
    b = 2
  }
}]]
```

And there you have it. Three of these libraries are written by one guy, <a href="https://github.com/kikito">kikito</a>, so if you want to browse more cool Lua, you should head over to his github.
