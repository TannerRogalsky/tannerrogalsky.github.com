---
layout: post
title: "How We Sped Up Our App By Not Using Memcached"
date: 2012-07-17 19:01
comments: true
categories:
---
A tiny preamble: I work for a company called <a href="http://uken.com/">Uken Games</a> and we make HTML5 games for various mobile platforms. I, specifically, work primarily on game called <a href="http://uken.com/">Mighty Monsters</a> which is, in my highly biased opion, one of the coolest HTML5 games around. I'm really proud of it for a number of reasons so it was a pleasant surprise but not entirely unexpected when <a href="http://newrelic.com/">New Relic</a> sent us an email telling us that ours was one of the fastest apps that it monitors and asking us to opt in to <a href="http://newrelic.com/app-speed-index">their list</a> where, at the time of writing, we are number six in online games.

This post is about my attempt at getting us even higher on that list.<!--more-->

Here at Uken, our caching system of choice is <a href="http://memcached.org/">Memcached</a> which has great Rails support so caching our reference data was high on the list of things. Being a game, Mighty Monsters has a fairly large amount of static data that is referenced by user-specific data. Since that reference data only ever grows at deploy time, we figured we could cache it very aggressively and almost indefinitely. The solution that I came up with was to write a module that could easily extend the existing models and overwrite the accessors with cached alternatives. It looked a little something like this:

```ruby
module CachedRelations
  def cache_relations(*args)
    args.each do |accessor|
      old_accessor = "orig_#{accessor}".to_sym
      alias_method old_accessor, accessor
      private old_accessor
      define_method accessor do
        Rails.cache.fetch("#{self.class}_#{self.id}_#{accessor}", :expires_in => 30.minutes) do
          self.send(old_accessor, true)
        end
      end
    end
  end
end
```

Which you would use by putting `extend CachedRelations` into your Rails models followed by calling `cache_relations` with the arguments being whichever the accessors for whichever relations you wanted to cache. It worked really well and allowed us to cache a large number of things with a high level of confidence.

The problem was that, when we deployed to production, we saw Memcached suck up a bunch of the time spent in the database as expected but it only replaced the DB time with Memcached time and we also saw our garbage collection time double. Overall, our app was slower now after implementing this aggressive caching. It was very disappointing.

It was apparent that, in overriding those accessors, we were defeating some built-in Rails caching to our detriment. Looking at the Rails source for relations, the method that they used was to create an instance variable after each time they pulled something from the database.
