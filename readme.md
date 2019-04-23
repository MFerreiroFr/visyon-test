## Technical test for Visyon

Author: Matías Ferreiro

#### Requirements

 - Stable internet connection for the libraries CDN
 - Http server is not provided. Use the one you like best (I used python HTTPSimpleServer)

#### How to use

 - Move around using the mouse, screen...
 - Hover over a menu option for a second and a half to activate it.
 - Click on the chevrons to move through the different menu items.
 - There is one video, one 360 video, two 360 images and 15 plain images to choose.

#### Scope

This application was tested on:
- Chrome and Firefox on a desktop computer.
- A OnePlus 5T.
- A CardBoard device with the said mobile device using Chrome.

#### Known issues
 - Some parts of the components could be more programmatical
 - 360 video will take some time to load on Chrome. This is probably because of video resolution not being a power of 2, so the WebGL needs to resize it before loading. Video quality is low so the time to resize it is a bit lower. In Firefox this works properly.
 - The assets are pretty random, and the resolutions could be tweaked to take some load out of the webGL renderer so it doesn't have to resize them.

#### Technical decisions

##### aframe vs aframe-react

Decided to use aframe after trying to make a little POC in aframe-react. The reasons were:

- aframe-react has performance issues as stated in its github page. This combined with my inexperience could lead to a serious performance problem.
- Aframe better documentation: adapting soome stuff to the react syntax was not very intuitive and with the time constraint I decided to go for the more familiar approach.


##### Scroll method

After careful consideration, I decided to use 2 buttons that respond on user click for the scroll oof the menu elements, for the following reason:

- This app was designed for 3DoF devices. Using gaze controls for the scroll would end up being unconfortable for the user as he would need to constantly move his head, or use head motions in order to make a "grab" scroll, which wouldn't help with possible motion sickness issues.

##### Absence of cursor fusing

The issue I found with cursor fusing was that once activated, The user had no way to make 2 different interactions (one with clicks and other with hovers as it is now). This situation led me to try and make my own events, even at the cost of some performance as there are more manual interactions with the DOM.
