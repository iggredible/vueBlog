<template>
  <div class="vimCheatsheet__container">
    <h1 class="vimCheatsheet__header">Vim Cheatsheet</h1>

    <div>
      Ipsum doloremque architecto dolore dolorum officiis Debitis eveniet
      aspernatur velit blanditiis distinctio Expedita distinctio aliquid
      eligendi vitae possimus ut Laboriosam non quidem perferendis pariatur
      laborum, est Illum eligendi dolorum dolorum.
    </div>
    <div class="vimCheatsheet__section-container">
      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">Quitting and saving Vim</h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:q</code>
          <span class="vimCheatsheet__section-description">Quit file</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:qa</code>
          <span class="vimCheatsheet__section-description">Quit all files</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:qa!</code>
          <span class="vimCheatsheet__section-description"
            >Quit all files, ignore changes</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:w</code>
          <span class="vimCheatsheet__section-description">Save</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:wq</code>
          <span class="vimCheatsheet__section-description">
            Save and quit current file
          </span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:q!</code
          ><span class="vimCheatsheet__section-description">
            Quit file, ignore changes
          </span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">ZZ</code>
          <span class="vimCheatsheet__section-description">Save and quit </span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">ZQ</code>
          <span class="vimCheatsheet__section-description"
            >Quit without checking changes
          </span>
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Basic movement
        </h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">h</code>
          <span class="vimCheatsheet__section-description">Move left</span>
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">j</code>
          <span class="vimCheatsheet__section-description">Move down</span>
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">k</code>
          <span class="vimCheatsheet__section-description">Move up</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">l</code>
          <span class="vimCheatsheet__section-description">Move right</span>
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Scrolling
        </h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">
            &lt;C-Y&gt; / &lt;C-E&gt;
          </code>
          <span class="vimCheatsheet__section-description"
            >Scroll up / down one line</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">
            &lt;C-D&gt; / &lt;C-U&gt;
          </code>
          <span class="vimCheatsheet__section-description"
            >Scroll up / down 1/2 screen</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">
            &lt;C-F&gt; / &lt;C-B&gt;
          </code>
          <span class="vimCheatsheet__section-description"
            >Scroll up / down full screen</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Word navigation
        </h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">b,w</code>
          <span class="vimCheatsheet__section-description"
            >Go backward / forward one word</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">B, W</code>
          <span class="vimCheatsheet__section-description"
            >Go backward / forward one WORD</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">e,ge</code>
          <span class="vimCheatsheet__section-description"
            >Go backward / forward to the end of a word</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">E, gE</code>
          <span class="vimCheatsheet__section-description"
            >Go backward / forward to the end of a WORD</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">%</code>
          <span class="vimCheatsheet__section-description"
            >Jump to next matching character ({}, [], ())</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Line navigation
        </h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">0 / $</code>
          <span class="vimCheatsheet__section-description"
            >Start / end of line</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">^ / g_</code>
          <span class="vimCheatsheet__section-description"
            >First / last nonblank</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">f{char} / F{char}</code>
          <span class="vimCheatsheet__section-description"
            >Go to next {char} occurrence forward/ backward</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">t{char} / T{char}</code>
          <span class="vimCheatsheet__section-description"
            >Go till before next {char} occurrence forward/ backward</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">; </code>
          <span class="vimCheatsheet__section-description"
            >Repeat next f/F/t/T</span
          >
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">; </code>
          <span class="vimCheatsheet__section-description"
            >Repeat next f/F/t/T, going opposite direction</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Searching
        </h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">*</code>
          <span class="vimCheatsheet__section-description">
            Search for word under cursor forward
          </span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">#</code>
          <span class="vimCheatsheet__section-description">
            Search for word under cursor backward
          </span>
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Other navigations
        </h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">}</code>
          <span class="vimCheatsheet__section-description"
            >Go to next paragraph</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">{</code>
          <span class="vimCheatsheet__section-description"
            >Go to previous paragraph</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">)</code>
          <span class="vimCheatsheet__section-description"
            >Go to next sentence</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">(</code>
          <span class="vimCheatsheet__section-description"
            >Go to previous sentence</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Document navigation
        </h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">gg</code
          ><span class="vimCheatsheet__section-description"
            >Go to first line</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">G </code
          ><span class="vimCheatsheet__section-description"
            >Go to last line
          </span>
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">:n / nG</code
          ><span class="vimCheatsheet__section-description">Go to line n</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">zz</code
          ><span class="vimCheatsheet__section-description"
            >Redraw and center the window where cursor is</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">H </code
          ><span class="vimCheatsheet__section-description"
            >Go to top line of the window</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">M </code
          ><span class="vimCheatsheet__section-description"
            >Go to middle line of the window</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">L </code
          ><span class="vimCheatsheet__section-description"
            >Go to bottom line of the window</span
          >
        </div>
      </div>
      <div class="vimCheatsheet__section">
        Tabs
        <div class="vimCheatsheet__section-item">
          :tabfind [file] Open file if exists in new tab
        </div>
        <div class="vimCheatsheet__section-item">
          :tabclose Close current tab
        </div>
        <div class="vimCheatsheet__section-item">:tabs List all tabs</div>
        <div class="vimCheatsheet__section-item">:tabfirst Go to first tab</div>
        <div class="vimCheatsheet__section-item">:tablast Go to last tab</div>
        <div class="vimCheatsheet__section-item">:tabn Go to next tab</div>
        <div class="vimCheatsheet__section-item">:tabp Go to previous tab</div>
        <div class="vimCheatsheet__section-item">from rtorr:</div>
        <div class="vimCheatsheet__section-item">
          :tabnew or :tabnew {page.words.file} - open a file in a new tab
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wT - move the current split window into its own tab
        </div>
        <div class="vimCheatsheet__section-item">
          gt or :tabnext or :tabn - move to the next tab
        </div>
        <div class="vimCheatsheet__section-item">
          gT or :tabprev or :tabp - move to the previous tab
        </div>
        <div class="vimCheatsheet__section-item">
          #gt - move to tab number #
        </div>
        <div class="vimCheatsheet__section-item">
          :tabmove # - move current tab to the #th position (indexed from 0)
        </div>
        <div class="vimCheatsheet__section-item">
          :tabclose or :tabc - close the current tab and all its windows
        </div>
        <div class="vimCheatsheet__section-item">
          :tabonly or :tabo - close all tabs except for the current one
        </div>
        <div class="vimCheatsheet__section-item">
          :tabdo command - run the command on all tabs (e.g. :tabdo q - closes
          all opened tabs)
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Replace mode
        </h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">r</code
          ><span class="vimCheatsheet__section-description"
            >Replace character under cursor</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">R</code
          ><span class="vimCheatsheet__section-description"
            >Enter Replace mode</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Going to insert mode
        </h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">a </code
          ><span class="vimCheatsheet__section-description"
            >Insert text after cursor</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">A </code
          ><span class="vimCheatsheet__section-description"
            >Insert text at the end of line</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">i</code
          ><span class="vimCheatsheet__section-description"
            >Insert text before cursor</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">I</code
          ><span class="vimCheatsheet__section-description"
            >Insert text before first non-blank at line</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">o</code
          ><span class="vimCheatsheet__section-description"
            >Create new line below, go to insert mode</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">O</code
          ><span class="vimCheatsheet__section-description"
            >Create new line above, go to insert mode</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">s</code
          ><span class="vimCheatsheet__section-description"
            >Delete character, go to insert mode</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">S</code
          ><span class="vimCheatsheet__section-description"
            >Delete line, go to insert mode</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">C</code
          ><span class="vimCheatsheet__section-description"
            >Delete from cursor to end of line, go to insert mode</span
          >
        </div>

        <div class="vimCheatsheet__section-item">J, gJ</div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">Joining 2 lines</h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">J</code
          ><span class="vimCheatsheet__section-description"
            >Join current line with below line, inserts space</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">gJ</code
          ><span class="vimCheatsheet__section-description"
            >Join current line with below line</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">Undo / Redo</h2>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">u</code
          ><span class="vimCheatsheet__section-description">Undo</span>
        </div>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">&lt;C-R&gt;</code
          ><span class="vimCheatsheet__section-description">Redo</span>
        </div>
      </div>

      <div class="vimCheatsheet__section">
        <h2 class="vimCheatsheet__section-header">
          Exiting insert mode/ go back to normal mode
        </h2>

        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code">Esc / &lt;C-[&gt;</code>
          <span class="vimCheatsheet__section-description"
            >Exit insert mode</span
          >
        </div>
        <div class="vimCheatsheet__section-item">
          <code class="vimCheatsheet__section-code"> &lt;C-C&gt;</code
          ><span class="vimCheatsheet__section-description"
            >Exit insert mode, abort command</span
          >
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Clipboard related
        <div class="vimCheatsheet__section-item">x</div>
        <div class="vimCheatsheet__section-item">d</div>
        <div class="vimCheatsheet__section-item">y</div>
        <div class="vimCheatsheet__section-item">p, P</div>
      </div>

      <div class="vimCheatsheet__section">
        Visual Mode
        <div class="vimCheatsheet__section-item">v</div>
        <div class="vimCheatsheet__section-item">V</div>
        <div class="vimCheatsheet__section-item">&lt;C-V&gt;</div>
      </div>

      <div class="vimCheatsheet__section">
        Inside visual mode:
        <div class="vimCheatsheet__section-item">&lt;, &gt; indent/ dedent</div>
        <div class="vimCheatsheet__section-item">y</div>
        <div class="vimCheatsheet__section-item">d</div>
        <div class="vimCheatsheet__section-item">~</div>
        <div class="vimCheatsheet__section-item">d, x to delete</div>
        <div class="vimCheatsheet__section-item">s to replace</div>
        <div class="vimCheatsheet__section-item">y to yank</div>
        <div class="vimCheatsheet__section-item">
          TODO: I think there is navigation WHILE inside visual mode. Look it
          up!
        </div>
      </div>

      <div class="vimCheatsheet__section">
        From rtorr (visual mode) - confirm?
        <div class="vimCheatsheet__section-item">aw - mark a word</div>
        <div class="vimCheatsheet__section-item">ab - a block with ()</div>
        <div class="vimCheatsheet__section-item">aB - a block with {}</div>
        <div class="vimCheatsheet__section-item">ib - inner block with ()</div>
        <div class="vimCheatsheet__section-item">iB - inner block with {}</div>
        <div class="vimCheatsheet__section-item">Esc - exit visual mode</div>
      </div>

      <div class="vimCheatsheet__section">
        indent/dedent
        <div class="vimCheatsheet__section-item">&gt;, &lt;</div>
        Operators
        <div class="vimCheatsheet__section-item">
          Operator + motion, or operator + text object
        </div>
        <div class="vimCheatsheet__section-item">
          ex: dw -> d is operator, w is motion, or diw
        </div>
      </div>

      <div class="vimCheatsheet__section">
        List of operators
        <div class="vimCheatsheet__section-item">from `:h operator`</div>
        <div class="vimCheatsheet__section-item">c</div>
        <div class="vimCheatsheet__section-item">d</div>
        <div class="vimCheatsheet__section-item">y</div>
        <div class="vimCheatsheet__section-item">~</div>
        <div class="vimCheatsheet__section-item">g~</div>
        <div class="vimCheatsheet__section-item">gu</div>
        <div class="vimCheatsheet__section-item">gU</div>
        <div class="vimCheatsheet__section-item">!</div>
        <div class="vimCheatsheet__section-item">=</div>
        <div class="vimCheatsheet__section-item">gq</div>
        <div class="vimCheatsheet__section-item">gw</div>
        <div class="vimCheatsheet__section-item">g?</div>
        <div class="vimCheatsheet__section-item">&gt;</div>
        <div class="vimCheatsheet__section-item">&lt;</div>
        <div class="vimCheatsheet__section-item">zf</div>
        <div class="vimCheatsheet__section-item">g@</div>
      </div>

      <div class="vimCheatsheet__section">
        Text objects - give some examples list of them:
        <div class="vimCheatsheet__section-item">p</div>
        <div class="vimCheatsheet__section-item">w</div>
        <div class="vimCheatsheet__section-item">s</div>
        <div class="vimCheatsheet__section-item">[, (, {, &lt;</div>
        <div class="vimCheatsheet__section-item">',",`</div>
        <div class="vimCheatsheet__section-item">b block `[(`</div>
        <div class="vimCheatsheet__section-item">B block `[{`</div>
        <div class="vimCheatsheet__section-item">pt XML tag block</div>
      </div>
      <div class="vimCheatsheet__section">
        Diffs
        <div class="vimCheatsheet__section-item">
          vimdiff file1 file2 file3 ... fileN
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Folds
        <div class="vimCheatsheet__section-item">zo / zO Open</div>
        <div class="vimCheatsheet__section-item">zc / zC Close</div>
        <div class="vimCheatsheet__section-item">za / zA Toggle</div>
        <div class="vimCheatsheet__section-item">
          zv Open folds for this line
        </div>
        <div class="vimCheatsheet__section-item">zM Close all</div>
        <div class="vimCheatsheet__section-item">zR Open all</div>
        <div class="vimCheatsheet__section-item">
          zm Fold more (foldlevel += 1)
        </div>
        <div class="vimCheatsheet__section-item">
          zr Fold less (foldlevel -= 1)
        </div>
        <div class="vimCheatsheet__section-item">zx Update folds</div>

        Jump
        <div class="vimCheatsheet__section-item">&lt;C-O&gt;</div>
        <div class="vimCheatsheet__section-item">&lt;C-Igt;</div>
        <div class="vimCheatsheet__section-item">gf</div>
        <div class="vimCheatsheet__section-item">What about &lt;C-]&gt;?</div>

        Increment/ decrement Comment how we can change alpha too!
        <div class="vimCheatsheet__section-item">`set nrformats=alpha `</div>
        <div class="vimCheatsheet__section-item">&lt;C-A&gt;</div>
        <div class="vimCheatsheet__section-item">&lt;C-X&gt;</div>
      </div>

      <div class="vimCheatsheet__section">
        Windows
        <div class="vimCheatsheet__section-item">
          z{height}&lt;Cr&gt; resize
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Tags :tag Classname Jump to first definition of Classname
        <div class="vimCheatsheet__section-item">
          lt;C-]gt; Jump to definition
        </div>
        <div class="vimCheatsheet__section-item">g] See all definitions</div>
        <div class="vimCheatsheet__section-item">
          lt;C-Tgt; Go back to last tag
        </div>
        <div class="vimCheatsheet__section-item">
          lt;C-Ogt; &lt;C-I&gt; Back/forward
        </div>
        <div class="vimCheatsheet__section-item">
          :tselect Classname Find definitions of Classname
        </div>
        <div class="vimCheatsheet__section-item">
          :tjump Classname Find definitions of Classname (auto-select 1st)
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Case
        <div class="vimCheatsheet__section-item">~</div>
        <div class="vimCheatsheet__section-item">gU / gUU</div>
        <div class="vimCheatsheet__section-item">gu / guu</div>
        <div class="vimCheatsheet__section-item"></div>
        Marks
        <div class="vimCheatsheet__section-item">
          `^ Last position of cursor in insert mode
        </div>
        <div class="vimCheatsheet__section-item">`. Last change</div>
        <div class="vimCheatsheet__section-item">`` Last jump</div>
        <div class="vimCheatsheet__section-item">
          ma Mark this cursor position as a
        </div>
        <div class="vimCheatsheet__section-item">
          `a Jump to the cursor position a
        </div>
        <div class="vimCheatsheet__section-item">
          'a Jump to the beginning of the line with position a
        </div>
      </div>

      <div class="vimCheatsheet__section">
        :marks - list of marks
        <div class="vimCheatsheet__section-item">
          ma - set current position for mark A
        </div>
        <div class="vimCheatsheet__section-item">
          `a - jump to position of mark A
        </div>
        <div class="vimCheatsheet__section-item">
          y`a - yank text to position of mark A
        </div>
        <div class="vimCheatsheet__section-item">
          Misc vim stuff
          <div class="vimCheatsheet__section-item">
            ]p - paste under current indentation level
          </div>
          <div class="vimCheatsheet__section-item">. - dot command</div>
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Command line (Command mode, aka `:`)
        <div class="vimCheatsheet__section-item">
          &lt;C-R&gt;&lt;C-W&gt; Insert current word into the command line
        </div>
        <div class="vimCheatsheet__section-item">
          &lt;C-R&gt;" Paste from “ register
        </div>
        <div class="vimCheatsheet__section-item">
          &lt;C-X&gt;&lt;C-F&gt; Auto-completion of path in insert mode
        </div>
        <div class="vimCheatsheet__section-item">
          (What about &lt;C-r&gt;&lt;C-r&gt; thing in macro? (C-r C-r
          {regNumber})
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Text alignment
        <div class="vimCheatsheet__section-item">:center</div>
        <div class="vimCheatsheet__section-item">:right</div>
        <div class="vimCheatsheet__section-item">:left</div>
      </div>

      <div class="vimCheatsheet__section">
        Calculator
        <div class="vimCheatsheet__section-item">&lt;C-r=1+1</div>
      </div>

      <div class="vimCheatsheet__section">
        Executing normal mode command while inside insert mode
        <div class="vimCheatsheet__section-item">
          C-o (run normal mode commands)
        </div>
      </div>
      <div class="vimCheatsheet__section">
        Executing command line commands from Command line mode with `!`
        https://dev.to/iggredible/execute-command-line-commands-from-inside-vim-51c
        Ex:
        <div class="vimCheatsheet__section-item">
          `:r !curl -s 'https://jsonplaceholder.typicode.com/todos/1'`
        </div>
        <div class="vimCheatsheet__section-item">`:r !ls **.*.js`</div>
        <div class="vimCheatsheet__section-item">
          `:!!` repeat previous bang command
        </div>
        Exiting (with error)
        <div class="vimCheatsheet__section-item">:cq</div>
        <div class="vimCheatsheet__section-item">:cquit</div>
      </div>

      <div class="vimCheatsheet__section">
        Spelling
        <div class="vimCheatsheet__section-item">
          :set spell spelllang=en_us Turn on US English spell checking
        </div>
        <div class="vimCheatsheet__section-item">
          ]s Move to next misspelled word after the cursor
        </div>
        <div class="vimCheatsheet__section-item">
          [s Move to previous misspelled word before the cursor
        </div>
        <div class="vimCheatsheet__section-item">
          z= Suggest spellings for the word under/after the cursor
        </div>
        <div class="vimCheatsheet__section-item">
          zg Add word to spell list
        </div>
        <div class="vimCheatsheet__section-item">
          zw Mark word as bad/mispelling
        </div>
        <div class="vimCheatsheet__section-item">
          zu / C-X (Insert Mode) Suggest words for bad word under cursor from
          spellfile
        </div>
      </div>

      <div class="vimCheatsheet__section">
        From https://vim.rtorr.com/
        <div class="vimCheatsheet__section-item">:h {something}</div>
        <div class="vimCheatsheet__section-item">
          :saveas file -> save file
        </div>
        <div class="vimCheatsheet__section-item">
          :close - close current pane
        </div>
        <div class="vimCheatsheet__section-item">
          K - open man page for word under cursor
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Registers
        <div class="vimCheatsheet__section-item">
          :reg - show registers content
        </div>
        <div class="vimCheatsheet__section-item">
          "xy - yank into register x
        </div>
        <div class="vimCheatsheet__section-item">
          "xp - paste contents of register x
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Macros
        <div class="vimCheatsheet__section-item">qa - record macro a</div>
        <div class="vimCheatsheet__section-item">
          q - stop recording macro
        </div>
        <div class="vimCheatsheet__section-item">@a - run macro a</div>
        <div class="vimCheatsheet__section-item">
          @@ - rerun last run macro
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Cut and paste
        <div class="vimCheatsheet__section-item">yy - yank (copy) a line</div>
        <div class="vimCheatsheet__section-item">
          2yy - yank (copy) 2 lines
        </div>
        <div class="vimCheatsheet__section-item">
          yw - yank (copy) the characters of the word from the cursor position
          to the start of the next word
        </div>
        <div class="vimCheatsheet__section-item">
          y$ - yank (copy) to end of line
        </div>
        <div class="vimCheatsheet__section-item">
          p - put (paste) the clipboard after cursor
        </div>
        <div class="vimCheatsheet__section-item">
          P - put (paste) before cursor
        </div>
        <div class="vimCheatsheet__section-item">
          dd - delete (cut) a line
        </div>
        <div class="vimCheatsheet__section-item">
          2dd - delete (cut) 2 lines
        </div>
        <div class="vimCheatsheet__section-item">
          dw - delete (cut) the characters of the word from the cursor position
          to the start of the next word
        </div>
        <div class="vimCheatsheet__section-item">
          D - delete (cut) to the end of the line
        </div>
        <div class="vimCheatsheet__section-item">
          d$ - delete (cut) to the end of the line
        </div>
        <div class="vimCheatsheet__section-item">
          x - delete (cut) character
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Search and replace
        <div class="vimCheatsheet__section-item">`/pattern`</div>
        <div class="vimCheatsheet__section-item">`?pattern`</div>
        <div class="vimCheatsheet__section-item">`/\vpattern`</div>
        <div class="vimCheatsheet__section-item">n, N</div>
        <div class="vimCheatsheet__section-item">:s/old/new/g</div>
        <div class="vimCheatsheet__section-item">:%s/old/new/g</div>
        <div class="vimCheatsheet__section-item">:%s/old/new/gc</div>
        <div class="vimCheatsheet__section-item">
          :noh - remove highlights
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Search multiple files
        <div class="vimCheatsheet__section-item">
          `:vimgrep /pattern/ {`{file}`} - search for pattern in multiple files`
        </div>
        <div class="vimCheatsheet__section-item">`:vimgrep /foo/ **/*`</div>
        <div class="vimCheatsheet__section-item">
          :cn - jump to the next match
        </div>
        <div class="vimCheatsheet__section-item">
          :cp - jump to the previous match
        </div>
        <div class="vimCheatsheet__section-item">
          :copen - open a window containing the list of matches
        </div>
      </div>

      <div class="vimCheatsheet__section">
        Working with multiple files (and window panes) - buffers/ opening file:
        <div class="vimCheatsheet__section-item">
          :e file - edit a file in a new buffer
        </div>
        <div class="vimCheatsheet__section-item">
          :bnext or :bn - go to the next buffer
        </div>
        <div class="vimCheatsheet__section-item">
          :bprev or :bp - go to the previous buffer
        </div>
        <div class="vimCheatsheet__section-item">
          :bd - delete a buffer (close a file)
        </div>
        <div class="vimCheatsheet__section-item">
          :ls - list all open buffers
        </div>
      </div>

      <div class="vimCheatsheet__section">
        - windows and such:
        <div class="vimCheatsheet__section-item">
          :sp file - open a file in a new buffer and split window
        </div>
        <div class="vimCheatsheet__section-item">
          :vsp file - open a file in a new buffer and vertically split window
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + ws - split window
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + ww - switch windows
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wq - quit a window
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wv - split window vertically
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wh - move cursor to the left window (vertical split)
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wl - move cursor to the right window (vertical split)
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wj - move cursor to the window below (horizontal split)
        </div>
        <div class="vimCheatsheet__section-item">
          Ctrl + wk - move cursor to the window above (horizontal split)
        </div>
      </div>
      From my cheatsheet article: - DO NOT try to commit all of them into memory
      in one sitting. - Learn 5-6 of them today, use them every day for a week!
      Don't rush - what's the hurry? - Learn another 5-6 next week while using
      the ones you learned previously. - Do vimgolf and see how you fare on your
      own, then learn from other golfers. - It took me almost a year to learn
      the above. I am still learning something new every week about Vim. Doing
      Vim is a long term commitment. - Learn to utilize help :h.
    </div>
  </div>
</template>
&__container { }

<script>
export default {};
</script>

<style lang="scss">
.vimCheatsheet {
  &__section-container {
    padding: 0px 10px 0 0;
    width: 100%;
  }
  &__section {
    display: inline-block;
    width: 100%;
    margin: 1rem 2rem 0 0;

    @media only screen and (min-width: 1024px) {
      float: left;
      width: 50%;
    }
  }

  &__section-code {
    padding: 0.25rem;
    background: #eeeeee;
  }

  &__section-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__section-description {
    text-align: right;
  }
}

.dark {
  .vimCheatsheet__section-code {
    color: #333333;
  }
}
</style>
