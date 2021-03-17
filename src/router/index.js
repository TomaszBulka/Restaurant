import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../views/AboutUs.vue'
import Menu from '../views/Menu.vue'
import Contact from '../views/Contact.vue'
import Opinions from '../views/Opinions.vue'
import LoginPanel from '../views/LoginPanel.vue'
import RegistrationPanel from '../views/RegistrationPanel.vue'
import Payments from '../views/Payments.vue'
import UserPanel from '../views/UserPanel.vue'
import AddressForm from '../views/AddressForm.vue'
import Confirmation from '../views/Confirmation.vue'
import NewUserConfirmation from '../views/NewUserConfirmation.vue'

const routes = [
  {
    path: '/',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/Menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: Contact

  },
  {
    path: '/Opinions',
    name: 'Opinions',
    component: Opinions
  },
  {
    path: '/Login',
    name:  'LoginPanel',
    component: LoginPanel
  },
  {
    path: '/Register',
    name: 'RegistrationPanel',
    component: RegistrationPanel
  },
  {
    path: '/Payments',
    name: 'Payments',
    component: Payments
  },
  {
    path: '/UserPanel',
    name: 'UserPanel',
    component: UserPanel
  },
  {
    path: '/AddressForm',
    name: 'AddressForm',
    component: AddressForm
  },
  {
    path: '/Confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/NewUserConfirmation',
    name: 'NewUserConfirmation',
    component: NewUserConfirmation

  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
