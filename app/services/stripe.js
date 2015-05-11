/* global Stripe */
import config from '../config/environment';
import Ember from 'ember';
var debug = config.LOG_STRIPE_SERVICE;

/**
 * Stripe Card API
 * @type {Object}
 */
var card = {
  createToken (card) {
    if (debug) {
      Ember.Logger.info('StripeService - card.createToken:', card);
    }

    // manually start Ember loop
    Ember.run.begin();

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Stripe.card.createToken(card, function (status, response) {

        if (debug) {
          Ember.Logger.info('StripeService - card.createToken handler - status %s, response:', status, response);
        }

        if (response.error) {
          reject(response);
          return Ember.run.end();
        }

        resolve(response);

        Ember.run.end();
      });
    });
  }
};

/**
 * Stripe BankAccount API
 * @type {Object}
 */
var bankAccount = {
  createToken (account) {
    if (debug) {
      Ember.Logger.info('StripeService - bankAccount.createToken:', account);
    }

    // manually start Ember loop
    Ember.run.begin();

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Stripe.bankAccount.createToken(account, function (status, response) {

        if (debug) {
          Ember.Logger.info('StripeService - bankAccount.createToken handler - status %s, response:', status, response);
        }

        if (response.error) {
          reject(response);
          return Ember.run.end();
        }

        resolve(response);

        Ember.run.end();
      });
    });
  }
};


export default Ember.Object.extend({
  createToken: Ember.deprecateFunc(
    'Please use `stripe.card.createToken` instead of `stripe.createToken`', card.createToken),
  card,
  bankAccount
});
