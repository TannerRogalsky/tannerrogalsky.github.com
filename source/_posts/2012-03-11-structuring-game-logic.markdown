---
layout: post
title: "Structuring Game Logic"
date: 2012-03-11 22:33
comments: true
categories: 
---
I've spent a fair amount of time experimenting both with Entity-Component frameworks and straight up heirarchical class structures in game development. My personal preference, when working with an API or a framework is something that has a very laissez-faire attitude toward how I structure my game; something very unopinionated. My conundrum is that I like Entity-Component frameworks but I don't want to have to do everything within them, I want more freedom to define things as classes with inheritance and whatnot. So I think I may have come up with a solution, at least for myself.<!--more-->

Basically, I use both. Or neither, depending on how you look at it.

I've been working with Love2D and Lua in my spare time. Lua is a prototype-based language but I've been using an excellent library call <a href="https://github.com/kikito/middleclass">Middleclass</a>. Lua has only one data structure: the table. Because it works as arrays, hashes and functions, it's trivial to push attributes and functions onto a class at runtime. With Middleclass's mixins, I can push stuff onto either the class itself or the instantiation of a class. I've just been storing level data as json for the time being, reading it in, parsing it and doing a key-value dump from the json to corresponding objects. It's surprisingly simple, very human-readable and I can even do custom scripting of objects where the object is being initially defined with the use of Lua's <code>loadstring</code> function.

For example: here's the definitions for a physics object:

{% gist https2019494 object.json %}

And the code to get it actually into the game:

{% gist https2019494 PhysicsObject.lua %}
