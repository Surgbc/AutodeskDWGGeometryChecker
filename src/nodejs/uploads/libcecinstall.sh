#!/bin/bash
#sudo apt-get update &&
#sudo apt-get install cmake libudev-dev libxrandr-dev python-dev swig &&

#install gcc-4.8 g++4.8
sudo add-apt-repository ppa:ubuntu-toolchain-r/test
sudo apt-get update; sudo apt-get install gcc-4.8 g++-4.8
sudo apt-get install build-essential
sudo update-alternatives --remove-all gcc 
sudo update-alternatives --remove-all g++
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 20
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 20
sudo update-alternatives --config gcc
sudo update-alternatives --config g++
sudo apt-get install libcec-dev build-essential python-dev
git clone https://github.com/Pulse-Eight/libcec.git
mkdir libcec/build 
cd libcec/build 
cmake .. 
make -j4 
sudo make install 
sudo ldconfig

sudo apt-get install cec-utils

