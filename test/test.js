var assert = require('assert');
var Propertype = require('../app.js');

const Person = Propertype({
  // to test string
  name: Propertype.string({ required: true, minLength: 3, maxLength: 255 }),
  // to test oneOf
  gender: Propertype.oneOf({ required: true, options: ['male', 'female'] }),
  // to test boolean
  married: Propertype.boolean.required,
  // to test number
  age: Propertype.number,
  // to test arrayOf
  skills: Propertype.arrayOf({ required: true, type: Propertype.string }),
  // to test email
  email: Propertype.email.required,
  // to test shape
  outfit: Propertype.shape({
    types: {
      shirtColor: Propertype.string,
      jeansColor: Propertype.string,
      sneakerSize: Propertype.number,
    }
  }),
  // to test any
  extras: Propertype.any,
});

describe('Array', () => {
  describe('#validate()', () => {
    it('should return undefined', () => {
      const payload = {
        name: 'Dariush Alipour',
        gender: 'male',
        married: true,
        age: 26,
        skills: ['js', 'golang'],
        email: 'drsh.alipour@gmail.com',
        outfit: {
          shirtColor: 'black',
          jeansColor: 'blue',
          sneakerSize: 47,
        },
      };

      assert.equal(Person.validate(payload), undefined);
    });

    it('should throw ValidationError', () => {
      const payload = {
        gender: 'male',
        married: true,
        age: 26,
        skills: ['js', 'golang'],
        email: 'drsh.alipour@gmail.com',
        outfit: {
          shirtColor: 'black',
          jeansColor: 'blue',
          sneakerSize: 47,
        },
      };

      assert.throws(() => Person(payload), { name: 'ValidationError' });
    });

    it('should return { name: \'propertype-required\' }', () => {
      const payload = {
        gender: 'male',
        married: true,
        age: 26,
        skills: ['js', 'golang'],
        email: 'drsh.alipour@gmail.com',
        outfit: {
          shirtColor: 'black',
          jeansColor: 'blue',
          sneakerSize: 47,
        },
      };

      assert.equal(Person.validate(payload).name, 'propertype-required');
    });

    it('should return { email: \'propertype-required\' }', () => {
      const payload = {
        name: 'Dariush Alipour',
        gender: 'male',
        married: true,
        age: 26,
        skills: ['js', 'golang'],
        outfit: {
          shirtColor: 'black',
          jeansColor: 'blue',
          sneakerSize: 47,
        },
      };

      assert.equal(Person.validate(payload).email, 'propertype-required');
    });
  });

  describe('#construct()', () => {
    it('should return 47', () => {
      const payload = {
        name: 'Dariush Alipour',
        gender: 'male',
        married: true,
        age: 26,
        skills: ['js', 'golang'],
        email: 'drsh.alipour@gmail.com',
        outfit: {
          shirtColor: 'black',
          jeansColor: 'blue',
          sneakerSize: '47',
        },
      };

      const person = Person(payload);

      assert.strictEqual(person.outfit.sneakerSize, 47);
    });
  });
});
