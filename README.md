# `live-svg`

`live-svg` is a simple script that will run a server to serve `.svg` files and
update them live as soon as you save.

It doesn't reload the entire page, it just updates the svg codes in the browser.

    live-svg [options] files...

    Start a server in the current working directory to serve svgs, live

    Usage:
    --help: display help message and exit
    --port <int>: port to use [default: 6336]

    Examples:
    $ live-svg             -> Just starts the
    $ live-svg --port 8000 -> Starts the server on port 8000
    $ live-svg mysvg.svg   -> Starts the server in the CWD and open mysvg.svg
                              in the browser

    See https://github.com/math2001/live-svg for more infos

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
