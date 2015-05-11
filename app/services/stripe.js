/* global Stripe */
import config from '../config/environment';
import Ember from 'ember';
var debug = config.LOG_STRIPE_SERVICE;

var card = {
  createToken (card) {
    if (debug) {
      Ember.Logger.info('StripeService: getStripeToken - card:', card);
    }

    // manually start Ember loop
    Ember.run.begin();

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Stripe.card.createToken(card, function (status, response) {

        if (debug) {
          Ember.Logger.info('StripeService: createToken handler - status %s, response:', status, response);
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
  createToken: Ember.deprecateFunc('Please use stripe.card.createToken instead', card.createToken),
  card
});
