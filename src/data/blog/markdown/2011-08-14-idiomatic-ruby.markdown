Ruby is, really, a great language in a lot of regards. It's expressive, powerful, easy to read and easy to write. It maintains a lot of features that people like and expect in a language, it has a simple and intuitive package manager and it has an enormous repository of frameworks and APIs that do a lot and work well.

I am relatively new to the Ruby world so this is a simplistic view of a complicated issue but it is a valid newcomer's perspective: Ruby is a good language; idiomatic Ruby is not. I'd like to share some of my frustrations while learning ruby alongside someone who follows these practises.<!--more-->

Implicit return statements are evil. Their only benefit is saving keystrokes but they make the code less immediately readable and less self-documenting. For a language that prides itself in having code made sense "in English" when it is read, the implicit return statement is both harmful and bizarre.

Using unless is a giant bag of worms. There are, I think, good times to use unless as a replacement for if not but I think that, often, the temptation to use it needlessly is too great for developers.

``` ruby
    good(use) unless dev == lazy
```

``` ruby
    unless there_is_a_very_good_reason
        dont_do(this)
```


Why would you not put parentheses around your method calls? I even like doing this one but I still know it's a bad idea. Trading a few keystrokes for the ability for everyone to read and understand your code with the least amount of difficulty is a trade-off we should be very, very rarely willing to make. I'm sure there are others that I'm not mentioning but these are the most immediate and violent offenders to my sensibilities.
