the goal of this repo is to write an anti-pattern version of a component that
calls various APIs with different contracts and parses those diverse responses
into a single shape - in this case something super simple like simple metadata
from a public API (e.g. img src and/or title) that developers will be tasked to refactor.

i will be guiding developers toward a strategy implementation with the prompt:
clean up this code _without using if/else blocks, ternarny operators, or
switches_

### needs

- identify a minimum of two public APIs with similar kinds of data but different
  shapes
  - (e.g.) a CAT IMAGES API and a DOG IMAGES API
  - ideally they are thematically related in some way (e.g. not a books API and
    a cars API)
  - optimize for what you can one-shot effectively.
    - e.g. if there's not a good/stable image-based public API, move to
      something stable and text based

### spec

- the app should contain a parent component that has a control that
  picks between the two APIs
- the app should contain a child component
  - that accepts some parameter that describes which API has been selected
  - it should have a "fetch" button that calls the API
  - it should format the request to a common shape before rendering
  - it should render something from the API (e.g. an image, some text)
- it should have the (slight) anti-pattern of featuring multiple if/else or
  switch blocks or ternary operators.
  - e.g. conditionally checking API mode to build an endpoint
  - e.g. conditionally checking API mode to parse the data

### bonus points

- a search field

### stack

- vite
- react

### notes

- keep design simple
