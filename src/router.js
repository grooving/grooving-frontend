import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Index.vue'
import ArtistsList from './views/ArtistsList.vue'
import OffersList from './views/OffersList.vue'
import OfferDetails from './views/OfferDetails.vue'
import AcceptedOffer from './views/AcceptedOffer.vue'
import Portfolio from './views/Portfolio.vue'
import ReceivePayment from './views/ReceivePayment.vue'
import PaymentConfirmation from './views/PaymentConfirmation.vue'
import PersonalInfo from './views/PersonalInfo.vue'
import ErrorView from './views/ErrorView.vue'
import MakeOffer from './views/MakeOffer.vue'
import CustomerInfo from './views/CustomerInfo.vue'
import NewUser from './views/NewUser.vue'
import CustomerRegister from './views/CustomerRegister.vue'
import ArtistRegister from './views/ArtistRegister.vue'
import EditPersonalInfo from './views/EditPersonalInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },    
    {
      path: '/artist_search',
      name: 'artist_search',
      component: ArtistsList
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
      path: '/newUser',
      name: 'newUser',
      component: NewUser,
    },
    {
      path: '/customerRegister',
      name: 'customerRegister',
      component: CustomerRegister,
    },
    {
      path: '/artistRegister',
      name: 'artistRegister',
      component: ArtistRegister,
    },
    {
      path: '/editPersonalInfo',
      name: 'editPersonalInfo',
      component: EditPersonalInfo,
    },
    {
      path: '*',
      name: 'error',
      component: ErrorView
    },
  ]
})
