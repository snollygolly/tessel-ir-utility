# :bulb: tessel-ir-utility

## The Goal
This project's goal is to make getting started with Tessel's IR module a little easier.  That's done by doing a few things:

- Allowing you to capture IR signals and download them.
- Providing a list of all captured IR signals and allowing you to send them.
- Formats the data a variety of ways to make analysis easier. _(coming soon)_

## What you need to get started

- A [Tessel 2](https://tessel.io/)
- A [Tessel 2 IR Module](https://tessel.io/modules#module-infrared)
- An IR remote (I think any will work?)

## How to run it

* Clone down the repository.
```
git clone https://github.com/snollygolly/tessel-ir-utility.git
```

* Install node packages (from inside the tessel-ir-utility folder).
```
npm install
```

* Create your config.  There's a `config.example.json` file in the root.  Save it as `config.json` and leave it in the root.  If you want to run the application on a different port or change other values, this can be done here.

* Run it from the Tessel
```
npm run tessel
```

* Or deploy it to the Tessel
```
npm run deploy
```

* Enjoy!
