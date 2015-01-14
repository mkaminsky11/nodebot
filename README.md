# nodebot
An ssh bot for ssh-chat by shazow. Based off of zshbot by Sxw1212. To log on using the username `user`, use:
```
ssh user@chat.shazow.net
```
##About##

This bot does a bunch of somewhat random things, and connects to the server using the node.js module `ssh2`.

<blockquote>
NOTE: if you're going to use a similar bot, CHANGE the name! nodebot is a reserved name, and you will promptly be kicked from ssh-chat. You just need to change the `nick` variable, and probably every instance of "nodebot".

You'll also want to change the location of your ssh key and ssh passphrase to match where you're running the script.
</blockquote>

nodebot also logs stuff. check it out <a href="https://codeyourcloud.com/nodebot/log.txt">here</a>.

##The Future##
* hangman!
* sports and technology news, not just from HN (via the `news` command)
* more ascii/unicode art
* ummm...more insults?
* pizza locations
* move ratings
* pizza movie ratings
* movie pizza locations


##Commands##

__hello__
```
user: nodebot hello
nodebot: hello, user
```
says hello back

__recommend__
```
user: nodebot recommend
nodebot: Move to Maine
```
dispenses advice

__weather__
```
user: nodebot weather Boston
nodebot: It is 18 degrees F in Boston
```
tells you the weather, and stuff. Uses the `weather-js` node.js module. Brrrrrr.

__insult__
```
user: nodebot insult NewYork
nodebot: NewYork talks like a paranoid monkey
```
makes random insults. For maximum effect, use private messages like `/msg nodebot insult New York`.

__math__
```
user: nodebot math 1m to ft
nodebot: 3.280839895013123 ft
user: nodebot sin(63 deg)
nodebot: 0.8910065241883678
```
it's smart, too! users the `mathjs` node.js module.

__5:00__
```
user: nodebot 5:00
nodebot: It's 5 o'clock somewhere. Right now, it is quitting time in: Moscow
```
as the song goes, "it's 5 o'clock somewhere....". nodebot knows where somewhere is.

__cat__
```
user: nodebot cat
nodebot: ʕ•ᴥ•ʔ - meow
```
pretends to be a cat

__lazer__
```
user: nodebot lazer
nodebot: ◑ ◔
nodebot: ╔═╗
nodebot: ║▓▒░░░░░░░░░░░░░░░░░░
nodebot: ╚═╝
nodebot: IMMA CHARGIN MAH LAZER!
```
fire lazers!

__sir__
```
user: nodebot sir
nodebot:  ┌─┐
nodebot:  ┴─┴ 
nodebot:  ಠ_ರೃ 
nodebot: LIKE A SIR
```
I'm so fancy!

__owner__
```
user: nodebot owner
nodebot: nodebot is made by node, whose ssh key is: de:d2:64:29:e3:3c:00:27:44:11:2c:94:10:52:2e:e9 via SSH-2.0-OpenSSH_5.9p1Debian-5ubuntu1.4
```
tellin' people who's boss

__glass__
```
user: nodebot glass
nodebot: (•_•)
nodebot: ( •_•)>⌐■-■
nodeobt: (⌐■_■)
```
because I can

__$__
```
user: nodebot $
nodebot: [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]
```
$$$

__documentation incomplete...come back later for all commands__
