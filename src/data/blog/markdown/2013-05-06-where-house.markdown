<img src="http://i.imgur.com/PCtbyh5.png" />

<i>Sokoban</i> is a Japanese word that translates to “warehouse keeper.” It’s a termed used for a genre of games that involve pushing blocks around to solve puzzles. You’ve probably played games that do this. Think Zelda-style rock pushing puzzles or Chip’s Challenge.

<i>Non-euclidean geometry</i> is a subset of geometry that disregards certain principles about the way that space works. You might have experienced this in games like Portal or Antichamber.

Over the weekend, at TOJam 2013, a group of friends and I made a non-euclidean sokoban game called Where?House. It has 17 levels of progressing difficulty, fantastic graphics and sounds. I’m really proud of how it came out. Thanks to everyone who helped out as well as TOJam for organizing the event.

Andrew Glisinski - Art<br/>
Chris Baragar - Level Design<br/>
Kyle Johnston - Music & SFX<br/>
Maggie McLean - SFX<br/>
Tanner Rogalsky - Code<br/>

Here are some download links.

<ul>
  <li><a href="ftp://ssh.tannerrogalsky.com/wherehouse_win_x86.zip">Windows 32-bit</a> / <a href="https://www.box.com/s/ycqq31rsmafggzk215rt">Alternative</a></li>
  <li><a href="ftp://ssh.tannerrogalsky.com/wherehouse_win_x64.zip">Windows 64-bit</a> / <a href="https://www.box.com/s/l7n1b3033ozq9f1qxq6x">Alternative</a></li>
  <li><a href="ftp://ssh.tannerrogalsky.com/wherehouse_mac.zip">Mac</a> / <a href="https://www.box.com/s/u9t1endufx78ipzyn91o">Alternative</a></li>
  <li><a href="ftp://ssh.tannerrogalsky.com/wherehouse.love">Source</a> / <a href="https://www.box.com/s/qe1uidshifb1237pipr3">Alternative</a></li>
</ul>

If you don't care about the specifics of how this was done, feel free to stop reading now.

Essentially, each level is a 2D grid made up of tiles. By default, each tile has four siblings: one in each cardinal direction. However, it’s not necessary that any given sibling be a direct neighbor to the tile. Heading North from a tile may send you across the map whereas heading East may put you just to the right of where you were.

Rendering these transitions consistently is something that I’m really pleased with. When you’re static, we draw you once in the tile that you exist in. When you’re moving, we draw you twice: first, we draw you tweening in the direction you requested to move. We also clip the rendering to your tile of origin. Second, we draw you tweening into the sibling tile while clipping the rendering to the sibling tile. We do this whether the sibling you’re moving to is a euclidean one or not and it works because the tweens sync up and it creates the illusion of a single render. It really helps to communicate what’s happening and ensure that players don’t think it’s just a bug.
