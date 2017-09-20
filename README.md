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

Open your browser at <http://localhost:3663> followed by the
relative path to the svg(s) you want to preview.

```
- root
    - subdirectory
        - mysvg.svg
```

So, if you run `live-svg` from root, you'll need to open
<http://localhost:6336/subdirectory/mysvg.svg>

It'll automatically watch the files that are open, and reload them as soon as you
save.

It makes learning to write SVG by hand or simply editing one much easier.

There are different options:

#### `--port <int>`

The port to run the server on. By default it's `6336`, because 336 because it's
the sum of the ASCII values of each letter in `svg`, and an extra 6 at the start
because [palindromes number][] are cool :smile:

#### `--cwd`

By default, it's the where you currently are. But, using the previous example, if
you ran: `live-svg --cwd subdirectory/`, you would've had to open
<http://localhost:6336/mysvg.svg>

#### `--auto-exit`

Automatically exit as soon as every tab previewing svgs on the server created by
live-svg in every browser.

Basically, if you close the last svg in the browser, this program will exit.

#### The rest?

Every other arguments will be considered as file names, and will automatically be
open in the browser by default.

### Absolute live

If you want to get browser be updated as soon as you make one modification, that
means you have to *save* as soon as you make one modification.

Therefore, it depends on your editors, but it shouldn't be too hard.

#### Sublime Text

Just use the plugin [auto-save](https://packagecontrol.io/packages/auto-save).

#### Vim

```vim
:autocmd TextChanged,TextChangedI <buffer> write<CR>
```

I recommend you bind it to a shortcut, for example

```vim
nnoremap <leader>l :autocmd TextChanged,TextChangedI <buffer> write<CR>
```

(feel free to contribute to add your favorite editor)

[Palindromes number]: https://en.wikipedia.org/wiki/Palindromic_number
