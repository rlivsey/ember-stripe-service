import config from '../config/environment';
import Ember from 'ember';
var debug = config.LOG_STRIPE_SERVICE;
var Stripe = window.Stripe;

function createToken (card) {
  if (debug) {
    Ember.Logger.info('StripeService: getStripeToken - card:', card);
  }

  return new Ember.RSVP.Promise(function (resolve, reject) {
    Stripe.card.createToken(card, function (status, response) {

      if (debug) {
        Ember.Logger.info('StripeService: createToken handler - status %s, response:', status, response);
      }

      if (response.error) {
        Ember.run(null, reject, response);
      } else {
        Ember.run(null, resolve, response);
      }
    });
  });
}

export default Ember.Object.extend({
  createToken: createToken
});
