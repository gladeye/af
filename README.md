# AF

Simple animation frame class with read and write cycles to seperate out logic and draws to improve performance.

Reads will run before Writes.

## Use

As a singleton. This should be the main way this is used.
```js
import { af } from 'AF'; // lowercase af

let count = 0;

function update(){
    count ++;
}

af.addRead( update );

af.removeRead( update );
```

Or you may extend the class.


```js
import { AF } from 'AF'; // uppercase AF

class NewAF extends AF{

}
```



## Methods

    - start()

    - stop()

    - addRead( fn )
        Adds function to the read cycle. These will run before the write functions

    - addWrite( fn )
        Adds function to the write cycle. These will run after the read functions

    - removeRead( fn )
        Removes function from the read cycle

    - removeWrite( fn )
        Removes function from the write cycle

    - onNextRead( fn )
        Adds function to run once on the next read cycle

    - onNextWrite( fn )
        Adds function to run once on the next write cycle
