const MIN_TILE_HEIGHT = 0;
const MAX_TILE_HEIGHT = 510;

const MAP_WIDTH = 135;
const MAP_LENGTH = 150;
const MAP_AREA = MAP_WIDTH * MAP_LENGTH;

const DIVIDER_WIDTH = 3;
const DIVIDER_LENGTH = 12;
const BORDER_SIZE = 5;
const TEAM_SIZE = 4;
const BASE_WIDTH = 29;

const Texture = {
    GRAY: 5,
    CLIFF_CORNER_OUTER: 54,
    ROAD: 59,
    SNOW: 64,
    SNOW_SPARSE: 70,
    CLIFF_STRAIGHT: 76,
    CLIFF_CORNER_INNER: 77
};

const BaseLayouts = {
    "20x29_normal-cF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB1-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB1-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB2-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB2-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB3-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB3-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_compact-c1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c3-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c3-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_short-3-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "         oo oo oo oo         ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "                             ",
    ],
    "17x29_short-4-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx xx xx xx xx xx xx   ",
        "   xp xp xp xp xp xp xp xp   ",
        "                             ",
        "   ooooo ooooo ooooo ooooo   ",
        "   ooooo ooooo ooooo ooooo   ",
        "                             ",
    ],
    "17x29_kracker-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "                             ",
    ],
    "17x29_kracker-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "                             ",
    ],
    "17x29_twin-1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ],
    "17x29_twin-2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ]
};


// x, y     - the northwest corner of the location where the layout is to be pasted
// layout   - an array of strings representing the layout
// rotation - an integer 0, 1, 2, or 3 representing 0, 90, 180, and 270 degree clockwise rotation of the layout
// mirror   - a boolean for if the layout should be mirrored lengthwise (left becomes right, right becomes left)
// player   - an integer repsenting the player that the structures/droids belong to
function pasteLayout(x, y, layout, rotation, mirror, player) {
    let width_t = layout[0].length;
    let length_t = layout.length;

    for (let row = 0; row < length_t; row++) {
        for (let col = 0; col < width_t; col++) {
            let char = (() => {
                switch (rotation) {
                    case 0: return mirror ? layout[row][width_t-1-col] : layout[row][col];
                    case 1: throw new Error("Not yet implemented"); // TODO
                    case 2: return mirror ? layout[length_t-1-row][col] : layout[length_t-1-row][width_t-1-col];
                    case 3: throw new Error("Not yet implemented"); // TODO
                }
            })();

            switch (char) {
                case "c":
                    structures.push({
                        name: "A0CyborgFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "f":
                    structures.push({
                        name: "A0LightFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 2,
                        player: player
                    });
                    break;
                case "h":
                    structures.push({
                        name: "A0CommandCentre",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "p":
                    structures.push({
                        name: "A0PowerGenerator",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "r":
                    structures.push({
                        name: "A0ResearchFacility",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "o":
                    structures.push({
                        name: "A0ResourceExtractor",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    texturemap[(y+row)*MAP_WIDTH + (x+col)] = Texture.SNOW_SPARSE;
                    break;
                case "t":
                    droids.push({
                        name: "ConstructionDroid",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: (2+rotation)%4 * 0x4000,
                        player: player
                    });
                    break;
            }
        }
    }
}

const BaseLayoutWeights = {
    "20x29_normal-cF1-rF": 1,
    "20x29_normal-cF1-rB": 1,
    "20x29_normal-cF2-rF": 1,
    "20x29_normal-cF2-rB": 1,
    "20x29_normal-cF3-rF": 1,
    "20x29_normal-cF3-rB": 1,
    "21x29_normal-cFF1-rF": 1,
    "21x29_normal-cFF1-rB": 1,
    "21x29_normal-cFF2-rF": 1,
    "21x29_normal-cFF2-rB": 1,
    "21x29_normal-cFF3-rF": 1,
    "21x29_normal-cFF3-rB": 1,
    "17x29_normal-cB1-rF": 1,
    "17x29_normal-cB1-rB": 1,
    "17x29_normal-cB2-rF": 1,
    "17x29_normal-cB2-rB": 1,
    "17x29_normal-cB3-rF": 1,
    "17x29_normal-cB3-rB": 1,

    "17x29_compact-c1-rF": 3,
    "17x29_compact-c2-rF": 3,
    "17x29_compact-c3-rF": 3,
    "17x29_compact-c1-rB": 3,
    "17x29_compact-c2-rB": 3,
    "17x29_compact-c3-rB": 3,

    "17x29_short-3-c": 9,

    "17x29_short-4-c": 9,

    "17x29_kracker-rF": 3,
    "17x29_kracker-rB": 3,

    "17x29_twin-1-rF": 4,
    "17x29_twin-1-rB": 4,

    "17x29_twin-2-rF": 4,
    "17x29_twin-2-rB": 4,
};

function weightedRandom(object) {
    let sum = 0;
    for (const property in object) {
        sum += object[property];
    }

    let choice = gameRand(sum) + 1;
    for (const property in object) {
        choice -= object[property];
        if (choice <= 0) {
            return property;
        }
    }
    throw new Error("weightedRandom");
}

/**
 * Fill an area (negative) e.g. create a pit
 *
 * @param {number} x - top left corner of the rectangular area
 * @param {number} y - top left corner of the rectangular area
 * @param {number} width - width of the rectangular area, in tiles
 * @param {number} length - length of the rectangular area, in tiles
 * @param {[(x: number, y: number) => number]} texture - a function that takes in x, y, and returns a texture for that position
 * @param {[(x: number, y: number) => number]} height - a function that takes in x, y, and returns a height for that position
 */
function fill_negative(x, y, width, length, texture, height) {
    for (let dy = 0; dy < length; dy++) { // Main body
        for (let dx = 0; dx < width; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            heightmap[i] = height?.(x+dx, y+dy);
            texturemap[i] = texture?.(x+dx, y+dy);
        }
    }
    if (height) {
        for (let dy = 0; dy < length + 1; dy++) { // Get the right edge
            const i = (y+dy)*MAP_WIDTH + (x+width);
            heightmap[i] = height(x+width, y+dy);
        }
        for (let dx = 0; dx < width; dx++) { // Get the bottom edge
            const i = (y+length)*MAP_WIDTH + (x+dx);
            heightmap[i] = height(x+dx, y+length);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////

const texturemap = Array(MAP_AREA).fill(Texture.GRAY);
const heightmap = Array(MAP_AREA).fill(MAX_TILE_HEIGHT);
const structures = [];
const droids = [];
const features = [];

fill_negative(
    /* x        = */ BORDER_SIZE,
    /* y        = */ BORDER_SIZE,
    /* width    = */ MAP_WIDTH - 2*BORDER_SIZE,
    /* length   = */ MAP_LENGTH - 2*BORDER_SIZE,
    /* texture  = */ () => Texture.SNOW,
    /* height   = */ () => MAX_TILE_HEIGHT / 2
);

// Paste the bases
let selectedLayouts = Array(TEAM_SIZE);
for (let i = 0; i < TEAM_SIZE; i++) {
    selectedLayouts[i] = BaseLayouts[weightedRandom(BaseLayoutWeights)];
}
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = selectedLayouts[i];
    const x = BORDER_SIZE + i*(BASE_WIDTH+DIVIDER_WIDTH);
    const y = BORDER_SIZE;
    pasteLayout(x, y, layout, 2, gameRand(2), i);
}
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = selectedLayouts[TEAM_SIZE-1-i];
    const x = BORDER_SIZE + i*(BASE_WIDTH+DIVIDER_WIDTH);
    const y = MAP_LENGTH - BORDER_SIZE - layout.length;
    pasteLayout(x, y, layout, 0, gameRand(2), i+TEAM_SIZE);
}

// Draw the battle line
for (let x = BORDER_SIZE; x < MAP_WIDTH - BORDER_SIZE; x++) {
    texturemap[(MAP_LENGTH/2-1)*MAP_WIDTH + x] = Texture.ROAD;
    texturemap[(MAP_LENGTH/2-0)*MAP_WIDTH + x] = Texture.ROAD;
}

// Make cliff tiles around the edges of the map
for (let x = y = BORDER_SIZE-1; y <= MAP_LENGTH-BORDER_SIZE; y++) {texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_STRAIGHT | (1 * 0x1000)}
for (let x = y = BORDER_SIZE-1; x <= MAP_WIDTH-BORDER_SIZE; x++) {texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_STRAIGHT | (2 * 0x1000)}
for (let x = MAP_WIDTH-BORDER_SIZE, y = MAP_LENGTH-BORDER_SIZE; x >= BORDER_SIZE-1; x--) {texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_STRAIGHT | (0 * 0x1000)}
for (let x = MAP_WIDTH-BORDER_SIZE, y = MAP_LENGTH-BORDER_SIZE; y >= BORDER_SIZE-1; y--) {texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_STRAIGHT | (3 * 0x1000)}
texturemap[(BORDER_SIZE-1)*MAP_WIDTH + BORDER_SIZE-1] = Texture.CLIFF_CORNER_INNER | (2 * 0x1000);
texturemap[(MAP_LENGTH-BORDER_SIZE)*MAP_WIDTH + BORDER_SIZE-1] = Texture.CLIFF_CORNER_INNER | (1 * 0x1000);
texturemap[(BORDER_SIZE-1)*MAP_WIDTH + MAP_WIDTH-BORDER_SIZE] = Texture.CLIFF_CORNER_INNER | (3 * 0x1000);
texturemap[(MAP_LENGTH-BORDER_SIZE)*MAP_WIDTH + MAP_WIDTH-BORDER_SIZE] = Texture.CLIFF_CORNER_INNER | (0 * 0x1000);

// Make dividers
const divider = (x, y, team = "A") => {
    // Height
    for (let dy = 1; dy <= DIVIDER_LENGTH; dy++) {
        const i = (y+dy)*MAP_WIDTH + (x+1);
        heightmap[i] = MAX_TILE_HEIGHT;
        heightmap[i+1] = MAX_TILE_HEIGHT;
    }
    // Side cliffs
    for (let dy = 1; dy < DIVIDER_LENGTH; dy++) {
        texturemap[(y+dy)*MAP_WIDTH + x] = Texture.CLIFF_STRAIGHT | (3 * 0x1000);
    }
    for (let dy = 1; dy < DIVIDER_LENGTH; dy++) {
        texturemap[(y+dy)*MAP_WIDTH + (x+2)] = Texture.CLIFF_STRAIGHT | (1 * 0x1000);
    }
    // Center texture
    for (let dy = 0; dy < DIVIDER_LENGTH; dy++) {
        texturemap[(y+dy+(team == "A" ? 0 : 1))*MAP_WIDTH + (x+1)] = Texture.GRAY;
    }
    // Corners and tips
    if (team == "A") {
        texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_CORNER_INNER | (3 * 0x1000);
        texturemap[y*MAP_WIDTH + x+2] = Texture.CLIFF_CORNER_INNER | (2 * 0x1000);
        texturemap[(y+DIVIDER_LENGTH)*MAP_WIDTH + x] = Texture.CLIFF_CORNER_OUTER | (3 * 0x1000);
        texturemap[(y+DIVIDER_LENGTH)*MAP_WIDTH + x+2] = Texture.CLIFF_CORNER_OUTER | (2 * 0x1000);
        texturemap[(y+DIVIDER_LENGTH)*MAP_WIDTH + x+1] = Texture.CLIFF_STRAIGHT | (2 * 0x1000);
    } else {
        texturemap[y*MAP_WIDTH + x] = Texture.CLIFF_CORNER_OUTER | (0 * 0x1000);
        texturemap[y*MAP_WIDTH + x+2] = Texture.CLIFF_CORNER_OUTER | (1 * 0x1000);
        texturemap[(y+DIVIDER_LENGTH)*MAP_WIDTH + x] = Texture.CLIFF_CORNER_INNER | (0 * 0x1000);
        texturemap[(y+DIVIDER_LENGTH)*MAP_WIDTH + x+2] = Texture.CLIFF_CORNER_INNER | (1 * 0x1000);
        texturemap[y*MAP_WIDTH + x+1] = Texture.CLIFF_STRAIGHT | (0 * 0x1000);
    }
};
for (let i = 0; i < TEAM_SIZE-1; i++) {
    const x = BORDER_SIZE + BASE_WIDTH + i*(DIVIDER_WIDTH + BASE_WIDTH);
    divider(x, BORDER_SIZE-1, "A");
    divider(x, MAP_LENGTH-BORDER_SIZE-DIVIDER_LENGTH, "B");
}

setMapData(MAP_WIDTH, MAP_LENGTH, texturemap, heightmap, structures, droids, features);
// function gameRand(){return 1}
