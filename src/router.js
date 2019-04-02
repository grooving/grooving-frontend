import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Index.vue'
import ArtistSearch from './views/ArtistSearch.vue'
import OffersList from './views/OffersList.vue'
import DateSelection from './views/DateSelection.vue'
import TimeSelection from './views/TimeSelection.vue'
import OfferDetails from './views/OfferDetails.vue'
import AddressInput from './views/AddressInput.vue'
import EventInput from './views/EventInput.vue'
import TypeOfHiring from './views/TypeOfHiring.vue'
import PaymentSelector from './views/PaymentSelector.vue'
import Payment from './views/Payment.vue'
import AcceptedOffer from './views/AcceptedOffer.vue'
import Portfolio from './views/Portfolio.vue'
import SentOffer from './views/SentOffer.vue'
import ReceivePayment from './views/ReceivePayment.vue'
import PaymentConfirmation from './views/PaymentConfirmation.vue'
import PersonalInfo from './views/PersonalInfo.vue'
import ErrorView from './views/ErrorView.vue'
import MakeOffer from './views/MakeOffer.vue'
import CustomerInfo from './views/CustomerInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: 'home',
      component: Home
    },
    {
      path: '/artist_search',
      name: 'artist_search',
      component: ArtistSearch
    },
    {
      path: '/offers',
      name: 'offers',
      component: OffersList
    },
    {
      path: '/offerDetails/:offerId',
      name: 'offerDetails',
      component: OfferDetails
    },
    {
      path: '/acceptedOffer/:offerId',
      name: 'acceptedOffer',
      component: AcceptedOffer
    },
    {
      path: '/showPortfolio/:artistId',
      name: 'showPortfolio',
      component: Portfolio
    },
    {
      path: '/receivePayment',
      name: 'receivePayment',
      component: ReceivePayment
    },
    {
      path: '/paymentConfirmation',
      name: 'paymentConfirmation',
      component: PaymentConfirmation
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo
    },
    {
      path: '/makeOffer/:artistId',
      name: 'makeOffer',
      component: MakeOffer
    },
    {
      path: '/customerInfo',
      name: 'customerInfo',
      component: CustomerInfo,
      props: true,
    },
    {
      path: '*',
      name: 'error',
      component: ErrorView
    },
  ]
})
