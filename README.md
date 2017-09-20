# `live-svg`

`live-svg` is a simple script that will run a server to serve `.svg` files and
update them live as soon as you save.

It doesn't reload the entire page, it just updates the svg codes in the browser.

## Installation

```
$ npm install -g live-svg
```

Or

```
$ yarn global add live-svg
```

## Usage

Start `live-svg` by just running it from your favorite terminal.

Open your browser at [localhost:6336](http://localhost:3663) followed by the
relative path to the svg(s) you want to preview.

```
- root
    - subdirectory
        - mysvg.svg
```

So, if you run `live-svg` in root, you'll need to open
[localhost:6336/subdirectory/mysvg.svg](http://localhost:6336/subdirectory/mysvg.svg)

It'll automatically watch the files that are open, and reload them as soon as you
save.

Have a look at the help message of the CLI:

```
live-svg [options] files...

Start a server in the current working directory to serve svgs, live

Usage:
  --help: display help message and exit
  --port <int>: port to use [default: 6336]

Examples:
  $ live-svg             -> Starts the server
  $ live-svg --port 8000 -> Starts the server on port 8000
  $ live-svg mysvg.svg   -> Starts the server and open mysvg.svg
                            in the browser

See https://github.com/math2001/live-svg for more infos
```

It makes learning to write SVG by hand or simply editing one much easier.

### Absolute live

If you want to get browser be updated as soon as you make one modification, that
means you have to *save* as soon as you make one modification.

Therefore, it depends on your editors, but it shouldn't be too hard.

#### Sublime Text

Just use the plugin [auto-save](https://packagecontrol.io/packages/auto-save).

#### Vim

```vim
:autocmd TextChanged,TextChangedI <buffer> write
```

I recommend you bind it to a shortcut, for example

```vim
nnoremap <leader>l :autocmd TextChanged,TextChangedI <buffer> write
```

(feel free to contribute to add your favorite editor)
