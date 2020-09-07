export module ErrorMessages {
    export const NO_HTML = "The current editor doesn't show a HTML document.";
}
export module ExtensionConstants {
    export const PREVIEW_URI = "HTMLPreview://authority/preview";
    export const STATUS_BAR_TEXT = "Preview Available";
    export const STATUS_BAR_TOOLTIP = "Click for Side Preview";
    // export const EXTENSION_ID = "hdg.live-html-previewer";
}

export const CSS_DOODLE_SELECTORS = [{
    label: ':doodle',
    desc: '',
    type: 'selector',
    code: [
`
// The :doodle is a special selector indicates to the component element itself. Note that the styles would be over-written by your normal CSS files outside. (try to hover on the doodle)
:doodle { --s: 0 }
:doodle(:hover) { --s: 1 }

transition: .5s cubic-bezier(.175, .885, .32, 1.275);
transition-delay: @rand(500ms);
transform: translateY(calc(var(--s) * 100%));
`
    ]
},{
    label: ':container',
    desc: '',
    type: 'selector',
    code: [
`
// The :container is the container element that holds all the cells, which is using Grid Layout. You may want to set grid-gap inside it.
:doodle {
    overflow: hidden;
}
:container {
    grid-gap: 1px;
    transform: rotate(45deg) scale(1.5);
}
`        
    ]
},{
    label: '@nth',
    desc: '@nth(n, ...)',
    type: 'selector',
    code: [
`
// Select the nth cell like :nth-child(n) does.
/* :nth-child is still valid though */
:nth-child(1) {
    background: #60569e;
}
@nth(5) {
    background: #60569e;
}
@nth(3n + 8) {
    background: #e6437d;
}
@nth(1, 5, 3n + 8) {
    :after {
        content: @index;
        color: #fff;
    }
}
`
    ]
},{
    label: '@even',
    desc: '',
    type: 'selector',
    code: [
`
// Select cells like :nth-child(even) but shorter.
@even {
    background: #60569e;
}
`    
    ]
},{
    label: '@odd',
    desc: '',
    type: 'selector',
    code: [
`
// Select cells like :nth-child(odd).
@odd {
    background: #60569e;
}
`    
    ]
},{
    label: '@at',
    desc: '@at(row, col)',
    type: 'selector',
    code: [
`
// Select cell at specific row and column.
@at(4, 2) {
    background: #60569e;
}
`
    ]
},{
    label: '@random',
    desc: '@random([ ratio ])',
    type: 'selector',
    code: [
`
// Select cells randomly. The ratio accepts value between 0 and 1. Defaults to 0.5.
@random {
    background: #60569e;
}
`,
`
// The selector can be applied multiple times.
@random { border-top: 1px solid #60569e; }
@random { border-left: 1px solid #60569e; }
@random(.2) {
    :after {
        content: '';
        background: hsl(@rand(360), 60%, 70%);
        @size: @rand(3px);
    }
}
` 
    ]
},{
    label: '@row',
    desc: '@row(n, ...)',
    type: 'selector',
    code: [
`
// Select the nth row of the grid.
@row(3) {
    background: #60569e;
}
`,
`
// The odd and even is supported.
@row(even) {
    background: #60569e;
}
`
    ]
},{
    label: '@col',
    desc: '@col(n, ...)',
    type: 'selector',
    code: [
`
// Select the nth column of the grid.
@col(3) {
    background: #60569e;
}
`,
`
// You can use odd and even too.
@col(odd) {
    background: #60569e;
}
`
    ]
}];

export const CSS_DOODLE_PROPERTIES = [{
    label: '@grid',
    desc: '',
    type: 'property',
    code: [
`
// This is another way to define the grid value and it has higher priority.
<css-doodle grid="5">
:doodle {
    /* will be 3x3 instead of 5x5 */
    @grid: 3x3;
    @size: 8em;
}
</css-doodle>
`,
`
// Set grid and doodle size at the same time:
<css-doodle>
:doodle {
    @grid: 8 / 8em;
}
</css-doodle>
`,
`
// The :doodle selector can be ommited if there's no other rules for it.
<css-doodle>
@grid: 8 / 8em;
background: #60569e;
</css-doodle>
`
    ]
},{
    label: '@use',
    desc: '',
    type: 'property',
    code: [
`
// Import styles from custom properties. It lets you write styles from normal css files.
<style>
:root {
    --rule-a: (
    @grid: 5 / 8em;
    clip-path: circle(100% at 0 0);
    background: #60569e;
    );
    --rule-b: (
    background-image:radial-gradient(#fff 50%,transparent 50%);
    background-position: -25% -25%;
    background-size: @r(40%, 80%) @lr();
    background-repeat: no-repeat;
    );
}
</style>
<css-doodle>
@use: var(--rule-a);
</css-doodle>
`,
`
// You can add multiple rules in a natural way:
<css-doodle>
@use: var(--rule-a), var(--rule-b);
/* or */
@use: var(--rule-a);
@use: var(--rule-b);
</css-doodle>
`,
`
// Or define it in the use attribute on the element.
<css-doodle use="var(--my-rule)"></css-doodle>
`
    ]
},{
    label: '@size',
    desc: '@size, @min-size, @max-size',
    type: 'property',
    code: [
`
// Set width and height in one place.
@size: 10em;
/* width: 10em; height: 10em; */

@size: 4em 5em;
/* width: 4em; height: 5em; */

@min-size: 8em;
/* min-width: 8em; min-height: 8em; */

@max-size: 8em;
/* max-width: 8em; max-height: 8em; */
`
    ]
},{
    label: '@place-cell',
    type: 'property',
    code: [
`
// Place cells relative to the grid.
@size: 1.6em;
@nth(1) { @place-cell: 0 top; }
@nth(2) { @place-cell: right 25%; }
@nth(3) { @place-cell: center; }
@nth(4) { @place-cell: .8em calc(100% - .8em); }
@nth(5) { @place-cell: 75% 80%; }
`    
    ]
},{
    label: '@shape',
    desc: 'circle|triangle|rhombus|pentagon|hexagon|heptagon|octagon|cross|star|diamond|infinity|heart|fish|whale|drop|bean|(hypocycloid, 3)|(hypocycloid, 4)|(hypocycloid, 5)|(hypocycloid, 6)|bicorn|(clover, 3)|(clover, 4)|(clover, 5)|(bud, 3)|(bud, 4)|(bud, 5)|(bud, 10)',
    type: 'property',
    code: [
`
// Turns the element into a shape which is generated with clip-path and polygon().
:doodle {
    @grid: 7 / 8em;
    @shape: circle;
}
@even {
    @shape: hypocycloid 4;
    background: #60569e;
    transform: scale(2) rotate(-60deg);
}
`    
    ]
}];

export const CSS_DOODLE_FUNCTIONS = [{
    label: '@index',
    desc: '',
    alias: '@i',
    type: 'function',
    code: [
`
// Returns the current index value of the cell.
:after {
    content: @index();
    color: #fff;
}
`,
`
// The parentheses can be omitted if the function has no parameter (since 0.7.5).
@grid: 5x1 / 8em;
@place-cell: center;
@size: calc(100% / 5 * @index);
opacity: calc(1.1 - 1 / 5 * @index);
z-index: calc(5 - @index);
background: #60569e;
`
    ]
},{
    label: '@row',
    type: 'function',
    code: [
`
// Returns the current row number of the cell.
:after {
    content: @row;
}
`
    ]
},{
    label: '@col',
    type: 'function',
    code: [
`
// Returns the current column number of the cell.
:after {
    content: @col;
}
`    
    ]
},{
    label: '@size-row',
    type: 'function',
    code: [
`
// Returns the max row number of the grid.
@grid: 4x2 / 8em 9em;
:after {
    content: @row / @size-row;
}
`
    ]
},{
    label: '@size-col',
    type: 'function',
    code: [
`
// Returns the max column number of the grid.
@grid: 2x4 / 8em 9em;
:after {
    content: @col / @size-col;
}
`    
    ]
},{
    label: '@size',
    type: 'function',
    code: [
`
// Returns the total cells count of the grid.
@grid: 3 / 8em;
:after {
    content: @i / @size;
}
`,
`
// These numbers can be used to generate dynamic values together with calc().
background: rgba(
    96, 86, 158,
    calc(@row * @col / @size)
);
`    
    ]
},{
    label: '@pick',
    desc: '@pick(v1, v2,...)',
    alias: '@p',
    type: 'function',
    code: [
`
// Randomly pick a value from the given list.
opacity: @pick(1, .6, .3, .1);
:after {
    content: @pick(1, 2, 3, 4);
}
`,
`
// It supports range format like this: [0-9a-z].
opacity: @pick(1, .6, .3, .1);
:after {
    content: @pick([a-z]);
}
`    
    ]
},{
    label: '@pick-n',
    desc: '@pick-n(v1, v2,...)',
    alias: '@pn',
    type: 'function',
    code: [
`
// Pick a value from the given list one by one.
opacity: @pick-n(1, .6, .3, .1);
:after {
    content: @pick-n([1-4]);
}
`    
    ]
},{
    label: '@pick-d',
    desc: '@pick-d(v1, v2,...)',
    alias: '@pd',
    type: 'function',
    code: [
`
// Pick a value like @pick-n(), but with distinct random order.
opacity: @pick-d(1, .6, .3, .1);
:after {
    content: @pick-d([a-z]);
}
`    
    ]
},{
    label: '@rand',
    desc: '@rand(start [,end])',
    alias: '@r',
    type: 'function',
    code: [
`
// Returns a random value between two numbers.
background: rgba(96, 86, 158, @rand(.9));
transition: .2s ease @rand(200ms);
transform: rotate(@rand(360deg));
clip-path: polygon(
    @rand(100%) 0, 100% @rand(100%), 0 @rand(100%)
);
`,
`
// It also recognizes the letter range:
:after {
    content: @rand(a, z);
    font-size: @rand(.4em, 1.2em);
}
`
    ]
},{
    label: '@last-pick',
    desc: '@last-pick, @last-rand',
    alias: '@lp',
    type: 'function',
    code: [
`
// Returns the last value of @pick, @pick-n, @pick-d and @rand.
background: linear-gradient(
    @pick-d(45deg, -45deg),
    @pick(#60569e, #e6437d),
    rgba(255, 255, 255, 0),
    @last-pick()
);
`
    ]
},{
    label: '@repeat',
    desc: '@repeat(times, value)',
    alias: '@rep',
    type: 'function',
    code: [
`
// Compose the given value multiple times.
border-radius: @repeat(4, @rand(40%, 60%));
/* dots */
:after {
background: #@repeat(6, @pick([0-9a-f]));
    /* ... */
}
`    
    ]
},{
    label: '@multiple',
    desc: '@multiple(times, value)',
    alias: '@m',
    type: 'function',
    code: [
`
// Same as @repeat(), but seperated with comma.
background: linear-gradient(
    @rand(360deg),
    @multiple(3, (
        @pick-n(#60569e, #e6437d, #ebbf4d)
            calc((@n - 1) * 100% / 3),
        @lp
            calc(@n * 100% / 3)
    ))
);
`    
    ]
},{
    label: '@n',
    desc: '@n, @N',
    type: 'function',
    code: [
`
// Used only inside @repeat and @multiple to indicate the current repeating count: @n and the max count value: @N.
background: radial-gradient(
    circle at @r(100%) @r(100%),
    @m(20, (
    @p(#60569e, #e6437d) calc((@n - 1) * 100% / @N),
    @lp calc(@n * 100% / @N)
    ))
);`,
`
// Since 0.6.2, the number that is followed the function name will be treated as the first parameter to the function, which will make the code much cleaner:
box-shadow: @m5(
    calc(@n * 2px) calc(@n * 2px) 0 0 #e6437d
);
`
    ]
},{
    label: '@stripe',
    desc: '@stripe(color [size], ...)',
    type: 'function',
    code: [
`
// Make stripe with gradients.
@grid: 5 / 8em;
background: linear-gradient(
    @rand(360deg),
    @stripe(#60569e, #e6437d, #ebbf4d)
);
`,
`
// The size for each step is optional.
background: linear-gradient(
    45deg,
    @stripe(
        #60569e 50%, #e6437d, #ebbf4d, #60569e
    )
);
// 
border-radius: 50%;
background: conic-gradient(
    @stripe(
        #60569e 10%,
        #e6437d 20%,
        #ebbf4d 30%,
        #321f35
    )
);
`
    ]
},{
    label: '@svg',
    desc: '@svg(svg)',
    type: 'function',
    code: [
`
// Use SVG directly as background image. The recommended way to use SVG is through with the @use property.
<style>
:root {
    --svg-example: (
        /* ... */
        background-image: @svg(
            <svg viewBox="0 0 100 175">
            @repeat50(<path
                stroke-width="@r.5"
                stroke="@p(#60569e, #e6437d)"
                d="M0, 0 L@r100, @r175"
            />)
            </svg>
        );
    );
}
</style>
<css-doodle use="var(--svg-example)"></css-doodle>
`
    ]
},{
    label: '@Math',
    dsc: '@<Math>',
    type: 'function',
    code: [
`
// All Math functions and constants are available prefixed with '@'.
--alpha: calc(
    @abs(@abs(@row - 3) + @abs(@col - 3) - 5) / 5
);
background: rgba(96, 86, 158, var(--alpha));
`,
`
// You can also use π directly.
transform:
    rotate(-15deg)
    translateX(calc(@sin(@i / 4) * π * 10px));
`
    ],
},{
    label: '@calc',
    desc: '@calc(expr)',
    type: 'function',
    code: [
`
// Evaluate calculations.
:after {
    content: @calc(@i * @i);
}
`
    ]
},{
    label: '@var',
    desc: '@var(expr)',
    type: 'function',
    code: [
`
// Same as var(). Used to prevent the browser from evaluating the value inside nested vars.
--bg: #60569e;
background: linear-gradient(
    @rand(360deg),
    @var(--bg) 50%, transparent 50%
);
`
    ]
},{
    label: '@hex',
    desc: '@hex(num)',
    type: 'function',
    code: [
`
// Transform a number into hex format.
:after {
    content: \@hex(@rand(9632, 9687));
}
`
    ]
}];

export const CSS_DOODLE_DICT = [...CSS_DOODLE_SELECTORS,...CSS_DOODLE_PROPERTIES,...CSS_DOODLE_FUNCTIONS];