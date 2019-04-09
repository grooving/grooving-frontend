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
import TopArtists from './views/TopArtists.vue'
import EditPortfolio from './views/EditPortfolio.vue'
import NewUser from './views/NewUser.vue'
import CustomerRegister from './views/CustomerRegister.vue'
import ArtistRegister from './views/ArtistRegister.vue'
import EditPersonalInfo from './views/EditPersonalInfo.vue'
import RegisterConfirmation from './views/RegisterConfirmation.vue'
import PriceSelector from './views/PriceSelector.vue'
import HiringSettings from './views/HiringSettings.vue'
import EditCustom from './views/EditCustom.vue'
import CreateCustom from './views/CreateCustom.vue'
import CreatePerformance from './views/CreatePerformance.vue'
import EditPerformance from './views/EditPerformance.vue'
import EditFare from './views/EditFare.vue'
import CreateFare from './views/CreateFare.vue'
import StartingDate from './views/StartingDate.vue'
import PerformanceSelector from './views/PerformanceSelector.vue'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
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
      path: '/registerConfirmation',
      name: 'registerConfirmation',
      component: RegisterConfirmation,
    },
    {
      path: '/priceSelector',
      name: 'priceSelector',
      component: PriceSelector,
    },
    {
      path: '/hiringSettings',
      name: 'hiringSettings',
      component: HiringSettings,
    },
    {
      path: '/editCustom',
      name: 'editCustom',
      component: EditCustom,
      props: true,
    },
    {
      path: '/editPerformance',
      name: 'editPerformance',
      component: EditPerformance,
      props: true,
    },
    {
      path: '/editFare',
      name: 'editFare',
      component: EditFare,
      props: true,
    },
    {
      path: '/createCustom',
      name: 'createCustom',
      component: CreateCustom,
    },
    {
      path: '/createPerformance',
      name: 'createPerformance',
      component: CreatePerformance,
    },
    {
      path: '/createFare',
      name: 'createFare',
      component: CreateFare,
    },
    {
      path: '*',
      name: 'error',
      component: ErrorView
    },
    {
      path: '/topArtists',
      name: 'topArtists',
      component: TopArtists,
    },
    {
      path: '/editPortfolio/:artistId',
      name: 'editPortfolio',
      component: EditPortfolio,
    },
    {
      path: '/hiringType/:artistId',
      name: 'hiringType',
      component: TypeOfHiring,
    },
    {
      path: '/dateSelection/:artistId',
      name: 'dateSelection',
      component: DateSelection,
    },
    {
      path: '/timeSelection/:artistId',
      name: 'timeSelection',
      component: TimeSelection,
    },
    {
      path: '/eventInput/:artistId',
      name: 'eventInput',
      component: EventInput,
    },
    {
      path: '/addressInput/:artistId',
      name: 'addressInput',
      component: AddressInput,
    },
    {
      path: '/paymentSelector/:artistId',
      name: 'paymentSelector',
      component: PaymentSelector,
    },
    {
      path: '/payment/:artistId',
      name: 'payment',
      component: Payment,
    },
    {
      path: '/performanceSelector/:artistId',
      name: 'performanceSelector',
      component: PerformanceSelector,
    },
    {
      path: '/sentOffer/:artistId',
      name: 'sentOffer',
      component: SentOffer,
    },
    {
      path: '/startingDate',
      name: 'startingDate',
      component: StartingDate,
    },
    
  ]
})
