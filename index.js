/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.13aa0a6a-4b84-4835-a286-b0851bc0477a';

const languageStrings = {
    'de': {
        translation: {
            INTENSEFACTS: [
                'Die Intense AG hat 65 hoch motivierte Mitarbeiter.',
                'Die Intense AG hat 2505 erfolgreiche Projekte.',
                'Die Intense AG hat 90 Kunden.',
                'Die Vorstände der Intense AG sind Kai Vogel, Michael Heinze und Nils Jensen',
                'Die Intense AG betreibt ein erfolgreiches Projekt- und Beratungsgeschäft.',
                'Die Intense AG hat seid 2017 eine neue Homepage',
                'Die Intense AG hat schon mehrere Segeltörns veranstaltet',
                'Die Intense AG würde 1999 gegründet',
                'Die Intense AG ist auf Facebook, XING und Youtube zu finden',
                'Die Intense AG hat 15 SCRUM-Master',
                'Der zweite Verkaufszweig der Intense AG sind Popcornmaschinen',
            ],
            ADDONS: [{
                   'energy efficiency solution'	:	 'Mit der Energy Efficiency <phoneme alphabet="ipa" ph="səˈluːʃən">Solution</phoneme> (<say-as interpret-as="spell-out">EES</say-as>) der Intense AG ist ein zukunftsorientiertes Energiemanagement zur Steigerung der Energieeffizienz und damit eine Hebung von Potentialen möglich. Dies befähigt Produktionsunternehmen die Identifizierung, Auswertung und Visualisierung von bisher unbekannten Korrelationen des Energieverbrauchs und ermöglicht eine energieeffiziente Produktionsplanung. Dies wird mithilfe der SAP Hana und mit dem Partner Dell EMC verwirklicht',
                    'business prozess management solution'	:	 'Platzhalter - Bitte ergänzen',
                    'business prozess management solution foma'	:	 'Platzhalter - Bitte ergänzen',
                    'abrechnungssperren management tool'	:	 'Platzhalter - Bitte ergänzen',
                    'auto rechnungskorrektur'	:	 'Platzhalter - Bitte ergänzen',
                    'business process exception management 1'	:	 'Platzhalter - Bitte ergänzen',
                    'datenaustauschportal'	:	 'Platzhalter - Bitte ergänzen',
                    'data conversion server'	:	 'Platzhalter - Bitte ergänzen',
                    'dynamic list manager'	:	 'Platzhalter - Bitte ergänzen',
                    'exception clearing monitoring'	:	 'Platzhalter - Bitte ergänzen',
                    'excel reporting framework'	:	 'Platzhalter - Bitte ergänzen',
                    'i.c.f a.l.v.'	:	 'Platzhalter - Bitte ergänzen',
                    'idex plugins'	:	 'Platzhalter - Bitte ergänzen',
                    'invoic management solution'	:	 'Platzhalter - Bitte ergänzen',
                    'k.p.i portal'	:	 'Platzhalter - Bitte ergänzen',
                    'malo a.a.p.'	:	 'Platzhalter - Bitte ergänzen',
                    'reklamations management solution'	:	 'Platzhalter - Bitte ergänzen',
                    'sap monitoring'	:	 'Leider keine Informationen vorhanden',
                }

            ],
            INTENSECUSTOMER: [
                'Vattenfall',
                'E-On',
                'RWE',
                'Stadtwerke München',
                'RWE',
                'EnBW',
                'RheinEnergie',
                'Würzburger Versorgungs- und Verkehrs GmbH',
                'Teag',
                'Eni',
            ],
            SKILL_NAME: 'Intense AG Skill',
            GET_FACT_MESSAGE: '<s> Hier sind deine Fakten: </s> ',
            GET_CUSTOMER_MESSAGE: '<s> Hier ist ein zufriedener Kunde der Intense AG: </s>',
            HELP_MESSAGE: 'Hier bekommst du Infos zur Intense AG <break time="0.25s"/> Du kannst sagen „Alexa, frage Intense AG“ und ein Schüsselwort „Fakten“, „Portfolio“, „Kunde“ oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
            WELCOME_MESSAGE: 'Willkommen bei der App der Intense AG - Intense your Life',
            PORTFOLIOFACT: '<s> Die Intense AG hat als SAP-Partner zur Zeit 17 Addons im Bereich SAP Industry <phoneme alphabet="ipa" ph="səˈluːʃəns">Solutions</phoneme> Utilities und eine Internet of Things-Lösung mit der INTENSE Energy Efficiency <phoneme alphabet="ipa" ph="səˈluːʃən">Solution</phoneme>. </s> Wenn du mehr wissen willst sag einfach den Satz: <break time="0.25s"/> „Info zu <break time="0.25s"/> und den Namen“ oder lass dir alle Namen mit „Nenne mir alle Namen“ aufzählen',
            ALL_ADDONS: 'Die Intense AG hat im SAP-Bereich und Internet of Things folgende Produkte: ',
            INFO_ADDONS: 'Wenn du mehr wissen willst frage mit „Info zu <break time="0.25s"/> und den Namen“ nach.'
        },
    },
};

const handlers = {
    'LaunchRequest': function() {
        const speechOutput = this.t('WELCOME_MESSAGE');
        this.emit(':tellWithCard', speechOutput, 'Entry-Menü', speechOutput);
    },

    /*Info Portfolio*/

    'GetPortfolioIntent': function() {
        this.emit('GetPortfolioFact');
    },
    'GetPortfolioFact': function() {
        const speechOutput = this.t('PORTFOLIOFACT');
        this.emit(':tell', speechOutput);
    },

    /*Info zu Anzahl und Quantität der Add-Ons*/

    'GetAddonIntent': function() {
        this.emit('GetAddonFact');
    },

    'GetAddonFact': function() {
        var addOnName = this.event.request.intent.slots.ADD_ON.value;
        // var clearAddOnName = this.event.request.intent.slots.ADD_ON.resolutions.resolutionsPerAuthority.values[0].value;
        const addOnArray = this.t('ADDONS');
        const addOn = addOnArray[0][addOnName];
        // this.emit(':tellWithCard', 'test', 'AddOn ' + clearAddOnName.toUpperCase(), 'test');
        if (!(addOnName in addOnArray[0])) {
            this.emit(':tellWithCard', 'Leider ist diese Erweiterung noch nicht entwickelt worden - wahrscheinlich wird es dann auch nicht gebraucht', 'Missing', addOn);
        }
        else {
            this.emit(':tellWithCard', addOn, 'AddOn ' + addOnName.toUpperCase(), addOn);
        }
    },

    /* Gibt alle Namen von allen Produkten aus */

    'GetAllNamesIntent': function() {
        this.emit('GetAllNames');
    },

    'GetAllNames': function() {
        const addOnArray = this.t('ADDONS');
        const allNamesArray = Object.keys(addOnArray[0]);
        const addOnString = allNamesArray.join('<break time="0.25s"/>');
        const englishString = addOnString.replace(/solution/g, '<phoneme alphabet="ipa" ph="səˈluːʃən">Solution</phoneme>');
        var clearAddOnString = englishString.replace(/1/, "one");
        clearAddOnString = clearAddOnString + '<break time="0.25s"/>';
        this.emit(':tellWithCard', this.t('ALL_ADDONS') + clearAddOnString + '<break time="0.25s"/>' + this.t('INFO_ADDONS'), 'Alle AddOns', this.t('ALL_ADDONS') + clearAddOnString + '<break time="0.25s"/>' + this.t('INFO_ADDONS'));
    },

    /*Random Fakten zur Intense AG*/

    'GetIntenseIntent': function() {
        this.emit('GetIntenseFact');
    },

    'GetIntenseFact': function() {
        const factArr = this.t('INTENSEFACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, 'Fakten über Intense AG', randomFact);
    },

    /*Random Kunden zur Intense AG*/

    'GetCustomerIntent': function() {
        this.emit('GetIntenseCustomer');
    },

    'GetIntenseCustomer': function() {
        const cusArr = this.t('INTENSECUSTOMER');
        const cusIndex = Math.floor(Math.random() * cusArr.length);
        const randomCus = cusArr[cusIndex];
        const speechOutput = this.t('GET_CUSTOMER_MESSAGE') + randomCus;
        this.emit(':tellWithCard', speechOutput, 'Kunden von Intense AG', randomCus);
    },

    /* Standard Funktionen */

    'DidNotUnderstand': function() {
        const speechOutput = this.t('Ich habe das nicht verstanden. Bitte wiederholen');
        this.emit(':tell', speechOutput);
    },

    'AMAZON.HelpIntent': function() {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_REPROMPT');
        this.emit(':tellWithCard', speechOutput, 'Hilfemenü', reprompt);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
