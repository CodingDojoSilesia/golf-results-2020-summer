// This program exploits an accidental discovery that the scoring server does not rank solutions based on byte size
// but on string length. In Python 3, the length on a Unicode string is equal to the number of UTF-32 code units.
// However, since node.js does not support UTF-32, we're stuck with UTF-16. If you're interested in reading more about
// this, I recommend visiting https://hsivonen.fi/string-length/.

// The <payload> is the actual code solving the task, compressed using deflate algorithm. I use a utility method
// from node.js' native `zlib` library to decompress it after initially reinterpreting it back from UTF-16 encoding
// (UCS-2 encoding is a subset of UTF-16, but in node.js they're equivalent when encoding and `ucs2` is shorter than
// `utf16le`) into a Buffer, then converting it back from a Buffer into a string and `eval`ling it.
eval(require('zlib').inflateRawSync(Buffer("<payload>","ucs2"))+'')

// The payload decompresses into the following, 435 characters long, solution:
r=[-1,1,0,0],[,,z,P]=process.argv,P=P.split(',').map(([x,y,s,q])=>({x,y,s,q,c:s>'R'&&14,n:BigInt(4*x^5^56*y)}));while(z--)for(p of P)with(p){s=--c?s:'R';n^=n<<13n;n^=n>>17n;n^=n<<5n,n%=1n<<30n;X=x-r[n%4n];Y=y-r[(n+2n)%4n];if(~q&P.every(o=>(X-o.x|Y-o.y)&7))y=Y,x=X;if(s<'I'&P.some(O=>O.c>0&r.some(X=>!r.every(b=>(x-X-O.x|y-b-O.y)&7))))s='S',c=14}for(y=9;--y;console.log(l))for(x=9,l='';--x;l+=p?p.s:'.')p=P.find(o=>!((-x-o.x|-y-o.y)&7))

// Many variable names, as well as the order of the statements and statements separator (using `,` instead of `;`) were
// chosen by trial and error in order to achieve minimal length of the output after compression.

// Solution explanation:
r=[-1,1,0,0], // r variable performs double duty:
              // * encoding of movement of people (for X - +1 for N%4==0, -1 for 1, 0 for 3 and 4, for Y - the same, but offset by 2)
              //   with signs reversed. The reversed signs allow me to not convert the X and Y position of each person
              //   into Number at the beginning, as `String-Number` will cast the String into Number, while `String+Number`
              //   will cast Number into String (`"2"-1 === 1` and `"2"+1 === "21"`)
              // * encoding of Moore's neighbourhood distances - doubling of 0 means the program will check each position
              //   with either X or Y equal to 0 twice, but it doesn't matter for our purposes and removes the need for
              //   another variable
[,,z,P]=process.argv, // reading number of iterations and the list of people using array destructuring
P=P.split(',').map( // splitting of list of people into array of people
    ([x,y,s,q])=>({ // using array destructuring to extract each character from the XYSQ code
        x,y,s,q, // assigning each value from XYSQ to separate property of a `person` object
        c:s>'R'&&14, // Initialization of curing counter - `s>'R'` is equivalent to `s=='S'` in the context of the task
                     // but is one character shorter. This will evaluate to `false` (which will be cast to `0` when
                     // mathematical operations are performed upon it) for healthy and recovered people
                     // and `14` for sick people.
        n:BigInt(4*x^5^56*y) // initialization of N value - BigInt is required, because the bit shift operations
                                    // required for computing next values of N overflow the 32 bit limit of bit operations
                                    // for Number type.
                                    // N is initialized with `4*x^5^56*y` because Wolfram Alpha told me that it is
                                    // mathematically equivalent to `(x * 4)^7 * (y * 8)^5` (which is the same as
                                    // `(x << 2)^7 * (y << 3)^5`) - see https://www.wolframalpha.com/input/?i=%28x+*+4%29+xor+7+*+%28y+*+8%29+xor+5
    })
);
while(z--)
    for(p of P)
        with(p){ // using the `with` statement causes JavaScript to first look up each variable within this block in
                 // the `p` object before the global scope is used. This means that instead of accessing `p` properties
                 // like `p.x = 0` I can write `x = 0`
            s=--c?s:'R'; // decrement the curing counter - if it reaches 0, mark the person as recovered
            n^=n<<13n; // Calculate next value of N - using `n` after integer literal is required, as other types are
                       // not automatically cast into BigInt
            n^=n>>17n;
            n^=n<<5n,
            n%=1n<<30n;
            X=x-r[n%4n]; // Calculate next X position by looking up the offset in `r` array
            Y=y-r[(n+2n)%4n]; // Same for Y but with an offset of 2 for the lookup
            // We want to apply the movement only if the person is not quarantined and the (X,Y) position is not already
            // taken. Since person should not move if Q is 1, we need to invert it for the logic condition. However,
            // Q is a string so both `!"0"` and `!"1"` evaluate to `true`
            if(~q& // Instead of using bitwise `&` operator instead of `&&` we can invert the value of Q using bitwise
                   // NOT - it will cast the String to Number and return two's complement value.
                   // For value of 0 it is -1 (0xFFFFFFFF) which has a 1 as the last bit
                   // For value of 1 it is -2 (0xFFFFFFFE) which has a 0 as the last bit
                   // Since the result of a call to `P.every()` will be a boolean, only these last bits will be taken
                   // into account when computing the result.
                P.every( // For every person, check if the (X,Y) spot is not already taken
                    o=>(X-o.x|Y-o.y)&7 // Here we're only interested in situations when X-o.x and Y-o.y is equal to 0,
                                       // which means that the spot is taken. By looking at only the last 3 bits of the
                                       // result (`&7`) we handle the PacMan-like wrap-around, since
                                       // `(-2)&7 === 6&&7 === 14&7`, etc. We combine both results using binary OR
                                       // because if any of these subtractions results in anything other than 0, the
                                       // 1 bits will stay in their place.
                ))
                y=Y,x=X; // Assign new values of `x` and `y` if spot was free. Using `,` to remove the need for curly braces
            // Infection check
            if(s<'I'& // If person is healthy - `s<'I'` is equivalent to `s=='H'`
                      // Using binary `&` instead of `&&` as it yields the same result for boolean operations and is shorter
                P.some( // We need only one person in the vicinity to infect
                    O=>O.c>0& // If the other person is sick - counter is positive only for sick people
                    r.some(
                        X=>!r.every( // Person is in the vicinity only if for some of the positions from Moore's neighbourhood
                                     // the subtractions of both X and Y positions result in 0 - by inverting logic, we
                                     // save one character over `X=>r.some(b=>!((x-X-O.x|y-b-O.y)&7))`
                            b=>(x-X-O.x|y-b-O.y)&7 // `b` is the Y offset to be checked. The same logic as for checking
                                                   // if spot for movement is free but with applying the additional X,Y
                                                   // offsets from the Moore's neighbourhood.
                        )
                    )
                )
            )
                s='S',c=14 // Mark the person as sick and initialize curing counter
    }
// Code below exploits the order of execution of each statement in the `for` loop declaration
for(y=9; // We start from 9, because loop condition is checked before each iteration
    --y; // We intentionally cause a side effect to a condition check and decrement the counter
    console.log(l)) // After each loop, print out the line of the output
    for(x=9,l=''; // Again, start from 9, but also initialize the output line string
        --x;
        l+=p?p.s:'.') // After the loop executes, add the found person's status or `.` in current position to the line of the output
            p=P.find( // Check if there is a person at a given coordinate
                o=>!((-x-o.x|-y-o.y)&7) // Again, same logic. For `find` to work properly, we need to negate the result.
                                        // Because we're iterating from 8 instead of from 0, we need to negate `x` and `y`
                                        // to not have a result flipped horizontally and vertically.
            )
