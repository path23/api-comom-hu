/**
 * Registration.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: { type: 'string', required: true },

    email: { type: 'string', required: true, unique: true },

    gyerekek_szama: { type: 'string' },

    gyerekek_kora: { type: 'string' },

    erkezes: { type: 'string' },

    idotartam: { type: 'string' },

    fotozas: { type: 'string' },

    bemutatkozas: { type: 'string' },

    vallalkozo_edesanyak: { type: 'string' },

    beszelgetes: { type: 'string' },

    pelikan_anett: { type: 'string' },

  },

  afterCreate: function(newRegistration, cb) {
    const feedbackEmailPromise = sails.helpers.sendTemplateEmail({
      to: newRegistration.email,
      subject: 'Sikeres regisztráció!',
      template: 'registration/email-registration-success',
      templateData: {
        name: newRegistration.name
      },
      layout: false
    });

    var guestData = JSON.stringify(newRegistration, null, 2);

    const notifyEmailPromise = sails.helpers.sendTemplateEmail({
      to: 'vajogaspar@gmail.com',
      subject: 'Új regisztráció',
      template: 'registration/email-new-registration',
      templateData: {
        guestData: guestData
      },
      layout: false
    });

    Promise.all([feedbackEmailPromise, notifyEmailPromise])
      .then(() => {
        cb();
      })
      .catch((err) => {
        console.warn(err);
        cb();
      });

  }

};
