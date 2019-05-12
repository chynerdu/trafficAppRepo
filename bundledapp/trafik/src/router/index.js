import Vue from 'vue'
import Login from '@/components/login'
import Signup from '@/components/register/signup'
import TrafficStatus from '@/components/traffic/traffic-status'
import TrafficReport from '@/components/traffic/traffic-report'
import SelectStatus from '@/components/traffic/select-status'
import TrafficResult from '@/components/traffic/traffic-result'


 export const routes = [
    {
      path: '/login',
      name: 'Hello',
      component: Login
    },
    {
    path: '/',
    redirect: '/login',
    component: Login,
    meta: {
          title: 'Trafik',
          // propertyCheck: true,
          noReqToken: true
        }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/traffic-status',
      name: 'TrafficStatus',
      component: TrafficStatus,
      meta: {
          title: 'Trafik',
          // propertyCheck: true,
          reqToken: true
        }
    },
    {
      path: '/traffic-report',
      name: 'TrafficReport',
      component: TrafficReport,
      meta: {
          title: 'Trafik',
          // propertyCheck: true,
          reqToken: true
        }
    },
    {
      path: '/select-status',
      name: 'SelectStatus',
      component: SelectStatus,
      meta: {
          title: 'Trafik',
          // propertyCheck: true,
          reqToken: true
        }
    },
    {
      path: '/traffic-result',
      name: 'TrafficResult',
      component: TrafficResult,
      meta: {
          title: 'Trafik',
          // propertyCheck: true,
          reqToken: true
        }
    }
  ]
