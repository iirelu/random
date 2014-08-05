Compilation instructions! Temporary quick compilation instructions!
Will give better instructions later when things are in a more complete state.

## Windows:
* NOTE: OBS on windows currently requires VS2013, as obs-studio uses C99 and
C++11.  Express might not be supported at this time (though I'll fix it at
some point).

* Clone the repo.  After cloning, run the following git commands, which will download submodules:
```
git submodule init
git submodule update
```

* Download (or build) development packages of FFmpeg, x264, Qt5.

* Download windows version of cmake from: http://www.cmake.org/

* Add windows environment variables:
  * `FFMpegPath` (path to FFmpeg include directory)
  * `x264Path` (path to x264 include directory)
  * `QTDIR` (path to Qt build base directory)

**NOTE**: Each of these environment variables can specify 32bit and 64bit by
appending 32 and 64 to the end of the environment variable names.
So if you want to separate locations for 32bit or 64bit, you can set:
FFmpegPath32, FFmpegPath64, x264Path32, x264Path64, QTDIR32, QTDIR64, etc.

**NOTE**: These variables are optional and these can be entered in to cmake while generating, but having these variables makes life much easier in case you need to regenerate your cmake data from scratch for whatever reason.

**NOTE**: An example Qt directory you would use here if you installed Qt5 to `D:\Qt` would usually look something like this for the 32bit version: `D:\Qt\5.3\msvc2013` And something like this for the 64bit version: `D:\Qt\5.3\msvc2013_64`

**NOTE**: Search paths and search order for FFmpeg and x264 library/binary files, relative to their include directories:

```
Library files
../lib
../lib32 (if 32bit)
../lib64 (if 64bit)
./lib
./lib32 (if 32bit)
./lib64 (if 64bit)

Binary files:
../bin
../bin32 (if 32bit)
../bin64 (if 64bit)
./bin
./bin32 (if 32bit)
./bin64 (if 64bit)
```

* Run cmake-gui. In "where is the source code", enter in the repo directory (example: D:/obs). In "where to build the binaries", enter the repo directory path with the 'build' subdirectory (example: D:/obs/build).

**NOTE**: The subdirectories 'build', 'release', and 'debug' are meant for builds, and are excluded from the repo in .gitignore, so they are safe to use for building.

* Press 'Configure', then enable the COPY_DEPENDENCIES option, then press 'Configure' again, and then press 'Generate' to generate visual studio project files in the 'build' subdirectory.

* Open obs-studio.sln from the 'build' subdirectory, and it should run and be good to go. All required dependencies should be copied on compile and it should be a fully fuctional build environment.


## Mac OSX
* Use macports or homebrew and install FFmpeg, x264, Qt5, and cmake.

**NOTE**: Qt5 can also be downloaded/installed via the Qt website, though keep in mind that you will have to set the `QTDIR` environment variable to the Qt5 build base directory.

* In a terminal, go to the obs-studio directory create a 'build' sub directory and change to it, then to build, type: `cmake .. && make`

* It builds in a modular structure by default.To run it via terminal, go to `build/rundir/RelWithDebInfo/bin`, then type `./obs` to run.

**NOTE**: If you are running via command prompt, you *must* be in the `bin` directory specified above, otherwise it will not be able to find its files relative to the binary.

* To create an app bundle instead, use the command `make package` This will create a .dmg file with an app bundle inside.


Linux
- You need a fairly recent Linux distribution.
Ubuntu 14.04 or a similar recent Linux distribution works fine, but
anything that's up-to-date should work.
Ubuntu 13.10 or older will **not** work because of the ancient
version of libav they use.

* Because Ubuntu and Debian come with libav instead of ffmpeg, you have
to get the original ffmpeg. Recommended:

For Ubuntu 14.04:
  https://launchpad.net/~jon-severinsson/+archive/ubuntu/ffmpeg
For Debian:
  http://www.deb-multimedia.org/

* There is also a ppa available in case you do not want to compile
yourself(Ubuntu 14.04 only):
  https://launchpad.net/~btbn/+archive/ubuntu/obs-studio

* Build dependencies on Ubuntu 14.04 with ffmpeg ppa from above: `cmake libpulse-dev qtbase5-dev libqt5x11extras5-dev libavcodec-dev libavformat-dev libswscale-dev libx264-dev libswresample-dev libfdk-aac-dev libxinerama-dev libxcomposite-dev libxrandr-dev`

* Building in portable mode(assuming you are in a terminal in the `obs-studio` base dir):

```
mkdir build && cd build
cmake -DUNIX_STRUCTURE=0 -DCMAKE_INSTALL_PREFIX="${HOME}/obs-studio-portable" ..
make -j4 && make install
```

* After that you should have a portable install in `~/obs-studio-portable` Change to `bin/64bit` or `bin/32bit` and run `./obs` to run it.

* If you want to install obs-studio into your system, it's recommended to use checkinstall instead of a plain make install. It allows for a clean uninstall and allows the package manager to keep track of the installed files:

```
sudo apt-get install checkinstall
mkdir build && cd build
cmake -DUNIX_STRUCTURE=1 -DCMAKE_INSTALL_PREFIX=/usr ..
make -j4
sudo checkinstall
```
