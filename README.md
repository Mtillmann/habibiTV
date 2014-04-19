habibiTV
========

HBBTV Twitter Client

removes the "smartTV" crap and covert tracking from your TV and
instead provides a stream of tweets on the screen.

## Setup

1. get a raspberry pi with a wifi adapter and plug it into your tv's usb port  
(or use any existing linux machine in your network)
2. install raspbian  
(or skip this step if you don't use a pi)
3. install dnsmasq  
(or any other dns server)
4. make sure your dns server has a static ip address
5. set your tv's dns server to your new dns server's ip address
6. paste the contents of hosts-german to /etc/hosts and put in your new servers ip address   
(or determine the hosts that need to be resolved if you live in another country by logging the lookups while changing channels)
7. install a webserver(apache+mod_rewrite), git client, nodejs, npm and bower
8. clone this repository to the webroot
9. run ``bower install``

## Usage

If the setup was successful a small twitter icon appear on the lower right
after switching channels. Press the ``red button`` on your remote to open
the app. Use your remote's cursor buttons or number buttons to enter the
hashtag you want to stream. Press the red button again to close the app.

## Limits

The app uses a static url to fetch tweets. If you experience problems just
send me an e-mail. 