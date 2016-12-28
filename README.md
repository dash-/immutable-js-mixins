# immutable-js-mixins
A collection of additional mixins for Facebook's immutable-js

## Installation

```sh
npm install --save immutable-mixins  # Install with npm
yarn add immutable-mixins            # Install with yarn
```

## Basic usage

Mixins are global, so it is recommended to perform this once in a central
location (such as a primary entry point).

```javascript
import Immutable from 'immutable-mixins';
import transform from 'immutable-mixins/transform';

Immutable.mixin({transform});

...
```

## Core API

### Immutable.mixin([classKey:string,] methods:object)

Mixes *methods* object into *Immutable[classKey]* object,
or *Immutable.Iterable* if no classKey is provided.

Parameters:
* classKey string The name of the class to modify
* methods object A key-value map of method names to methods

### Immutable.mixinAll()

Mixes all immutable-mixins mixins into the appropriate objects.

## Mixins(1)

* transform

### Iterable.transform(transformer)
* transformer function Operation that processes iterable to produce the
  transformation
    * iterable Iterable The iterable

```javascript
import Immutable from 'immutable-mixins';
import transform from 'immutable-mixins/transform';

Immutable.mixin({transform});

...

export default collection => (
  fromJS(collection)
  .sort(sortBy('order'))
  .transform((remaining) => {
    let transformed = fromJS([]);

    while(remaining.size > 0) {
      const people = remaining.takeWhile(isPerson);

      if(people.size > 0) {
        transformed = transformed.push(
          emptyMemo.update('people', (list) => (
            list.concat(people.map(person => person.get('name')))
          )).set('order', people.last().get('order'))
        );
        remaining = remaining.skipWhile(isPerson);
      }

      const notPeople = remaining.takeUntil(isPerson);

      if(notPeople.size > 0) {
        transformed = transformed.concat(notPeople);
        remaining = remaining.skipUntil(isPerson);
      }
    }

    return transformed;
  }).toJS();
```

## Notes

The current implementation is just an initial draft.  It surely isn't the best
possible implementation, and it probably won't be the final implementation.
In particular, I'm sure there has to be a better way of doing mixins that
doesn't have the same global impact.  However, as I couldn't quickly and easily
find a more-preferable implementation, I went with the easiest path forward and
am confident future feedback will provide additional guidance.

Please feel encouraged to submit feedback / issues to improve this library.
Additional mixins are welcome, but please spend at least some effort to avoid
submitting mixins that already have simple solutions, such as operations that
can already be performed by passing custom predicates as in
[lodash-style pick or omit](https://github.com/facebook/immutable-js/wiki/Predicates).

