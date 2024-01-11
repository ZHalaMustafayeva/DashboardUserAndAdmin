import React, { Suspense } from 'react';
import style from './style.module.scss';
import { Result, Button, Spin } from 'antd';
import {
  Route,
  Navigate,
  Outlet,
  Link,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Layout from '../Layouts';
import { Auth } from '../Config'
import {
  Home,
  TestComponents,
  Login,
  Order,
  Markets,
  Branch,
  Company,
  Product,
  ForgetPass,
  Basket,
  ReturnBasket,
  PlateNumber
} from '../Pages';

const Index = () => {

  return (

    <BrowserRouter>
      <Suspense fallback={<Spin className={style.spin} tip='Yüklənir...' />}>
        <Routes>
          <Route path='login' element={<Login />}>
          </Route>
          <Route path='forget-password' element={<ForgetPass />}>
          </Route>

          <Route path='/' element={<Auth><Layout /></Auth>}>
            <Route index element={<Auth><Order /></Auth>} />
            <Route path='order' element={<Auth><Outlet /></Auth>}>
              <Route index element={<Order />} />
              <Route path='markets' element={<Outlet />} >
                <Route index element={<Markets />} />
                <Route path='branch/:id' element={<Outlet />} >
                  <Route index element={<Branch />} />
                  <Route path='company/:id' element={<Outlet />} >
                    <Route index element={<Company />} />
                    <Route path='plate-number/:id' element={<Outlet />}>
                      <Route index element={<PlateNumber />} />
                      <Route path='product/:id' element={<Product />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
              <Route path='basket' element={<Basket />} />
            </Route>
            <Route path='return' element={<Auth><Outlet /></Auth>}>
              <Route index element={<Order />} />
              <Route path='markets' element={<Outlet />} >
                <Route index element={<Markets />} />
                <Route path='branch/:id' element={<Outlet />} >
                  <Route index element={<Branch />} />
                  <Route path='company/:id' element={<Outlet />} >
                    <Route index element={<Company />} />
                    <Route path='plate-number/:id' element={<Outlet />}>
                      <Route index element={<PlateNumber />} />
                      <Route path='product/:id' element={<Product />} />
                    </Route>
                    {/* <Route path='product/:id' element={<Product />} /> */}
                  </Route>
                </Route>
              </Route>
              <Route path='basket' element={<ReturnBasket />} />
            </Route>
            <Route path='accounting' element={<Outlet />}>
              <Route index element={<Navigate to={process.env.REACT_APP_ACCOUNTING} />} />
              <Route path='test' element={<Outlet />}>
                <Route index element={<TestComponents />} />
              </Route>
            </Route>

            {/* ---------status message--------- */}
            <Route path='404'
              element={<Result
                status='404'
                title='404'
                subTitle='Üzr istəyirik: Daxil etdiyiniz səhifə tapılmadı.'
                extra={<Link to={process.env.REACT_APP_HOME} ><Button type='primary'>Ana Səhifə</Button></Link>}
              />}
            />
            <Route path='500'
              element={<Result
                status='500'
                title='500'
                subTitle='Üzr istəyirik: Gözlənilməyən xəta baş verdi'
                extra={<Link to={process.env.REACT_APP_HOME} ><Button type='primary'>Ana Səhifə</Button></Link>}
              />}
            />
            {/* ---------status message--------- */}

            <Route path='*' element={<Navigate to={process.env.REACT_APP_404} />} />

          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>

  )
}


export default Index;