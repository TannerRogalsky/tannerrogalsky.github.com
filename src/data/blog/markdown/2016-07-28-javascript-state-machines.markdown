While prototyping a new game for Uken, I found myself wanting a nice, simple, flexible state machine for JavaScript. Encapsulating game entity behaviours and state into their own components and being able to trust that a given component will just behave properly when one of its methods is called makes developement a lot faster and simpler. Something that might have been an unmanagable nest of if/else statements or an enormous switch statement can be reduced to a single function call that just works depending on the entity's state.

I was a little disappointed by the state of JS state machines. I'm sure that the libraries that exist that do this work are top-notch but (for my taste) they're a little rigid. Many of them are just fairly simple abstractions over that big, nasty switch statement. I didn't want to have to define all the relationships between all my states ahead of time. In general I wanted to avoid having to have a big configuration block that dictates something that should be a natural and evolving thing: application state.

Thankfully, there's a better way.

## Genesis: UnrealScript States

In UE3, UnrealScript introduced a feature to [support states at the language level](https://udn.epicgames.com/Three/UnrealScriptStates.html). This enabled you to 'write functions and code that exist in a particular state'. States were a particular data structure that was associated with a class and defined a behaviour or set of behaviours that were only accessible while the instance of that class was executing code in that state. This let you bundle all the relevant logic together. It also decouple states from each other in that all their logic didn't need to exist together in a single expression.

## Evolution: Stateful

This is a nice solution if you have complete control over the language like Unreal does but that's not a luxury that's afforded to most of us. Thankfully, it's not really necessary if you're working in an interpreted language like JavaScript or... Lua. My first exposure to this style of state machine wasn't actually UE3, it was a Lua library (or mixin, more aptly) called [Stateful.lua](https://github.com/kikito/stateful.lua). The way it works is by mixing into an existing class and exposing an `addState` function on a class and which in turn created a `gotoState` function on any instance.

```lua
local class    = require 'middleclass'
local Stateful = require 'stateful'

local Enemy = class('Enemy')
Enemy:include(Stateful)

function Enemy:initialize(health)
  self.health = health
end

function Enemy:speak()
  return 'My health is' .. tostring(self.health)
end

local Immortal = Enemy:addState('Immortal')

-- overriden function
function Immortal:speak()
  return 'I am UNBREAKABLE!!'
end

-- added function
function Immortal:die()
  return 'I can not die now!'
end

local peter = Enemy:new(10)

peter:speak() -- My health is 10
peter:gotoState('Immortal')
peter:speak() -- I am UNBREAKABLE!!
peter:die() -- I can not die now!
peter:gotoState(nil)
peter:speak() -- My health is 10
```

I've always found this a really nice way to think about entity behaviours and state. Unfortunately, a library like this didn't exist for JavaScript. Fortunately, it was pretty easy to make something similar. Enter: [make-stateful](https://github.com/TannerRogalsky/make-stateful).

## The Good, The Bad, The Stateful

make-stateful exposes a very similar API to Stateful.lua. A call to `Stateful.extend` with a JS class as an argument will extend that class to include the `addState` function to register new states and the class's prototype to include a `gotoState` function so that instances can transition between states. It's simple, requires minimal configuration and just works. You never need to check what state you're in - you just structure your entities to behave properly given any state.

The one downside of using this approach in JavaScript is that you need to modify the 'base' entity whenever you transition states. In Lua, transitioning to a new state is as simple as updating a reference to what should be currently used as the entity's state. The object's properties don't need to be modified: the correct property is fetched from the current state whenever it's requested. JavaScript doesn't have a language feature that allows us to reasonably accomplish this, though. Yet.

## The Future

At the time of this writing, browser support for Proxy and Reflect is [peeking above 50%](http://caniuse.com/#feat=proxy). With those facilities, we can start doing something similar to what Lua does with metatables and just swap out the state reference when we transition states.

```javascript
const extend = function(klass) {
  var states = {undefined: klass.prototype};

  klass.addState = function(stateName, state) {
    states[stateName] = state;
  }

  return new Proxy(klass, {
    construct: function(target, args) {
      var currentState = target.prototype;
      var instance = Reflect.construct(target, args);

      instance.gotoState = function(stateName, ...args) {
        currentState = states[stateName];
      }

      return new Proxy(instance, {
        get: function(target, name, receiver) {
          if (currentState[name]) {
            return currentState[name];
          } else {
            return target[name];
          }
        }
      });
    }
  });
}
```

The places that this code will run is still somewhat limited for browser use but it's something to look forward to. In the meantime, the current implementation of make-stateful works just great!

Links:
* https://github.com/TannerRogalsky/make-stateful
* https://udn.epicgames.com/Three/UnrealScriptStates.html
* https://github.com/kikito/stateful.lua
