#!/bin/bash

docker build . -t rpg-kata.js

docker run -it -v `pwd`:/rpg-kata.js rpg-kata.js /bin/bash
