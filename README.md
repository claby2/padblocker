# padblocker
A physical Adblocker -- because who needs good solutions to problems?
Project for Hack&Roll 2020.
Team plam: Leo Lee, Edward Wibowo, Vir Chaudhury
https://devpost.com/software/padblocker

## Inspiration
We wanted to solve the problem of ads and content creator revenue and do it better, and impractically.

## What it does
It uses advanced technology such as a piece of fabric and four AA batteries to block ads on your computer screen in real life. When an ad is detected, a motor and Arduino servo would roll down the fabric, effectively covering the ad from sight. Further, totally useful ad statistics are displayed with the extension, such as Nanograms of CO2 Emitted as a result of the motors.

## How we built it
We used state-of-the-art advanced technologies such as a piece of fabric and AA batteries and threw it together with some Arduino, motors and a motor driver. As for the ad detection, we made a Chrome extension to report the position of the ad to the Arduino. To get the communication going between the Arduino and the extension, we built a web server using Flask which the extension can make POST requests to, as Chrome didn’t support direct serial communication for some reason.

## Challenges we ran into
This project actually ended up being more complex than we originally thought. There were many problems we encountered, especially on the hardware side, which we didn't think of in the planning process. We discovered that the natural phenomenon of gravity interfered with the fabric’s attempts to move up and down accurately. So we had to mess with time values.

## Accomplishments that we're proud of
We only short circuited and melted our battery terminals once. On a more serious note, all of us were relatively inexperienced at hardware, so the fact that we could throw this together in 24 hours was pretty nice.

## What we learned
We learnt how to use an Arduino and various hardware components.

## What's next for padblocker
Allow the ability to block any ads on the x-axis and make it more consistent.
