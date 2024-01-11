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
import {
  Home,
  TestComponents,
  Login,
  Admin,
  Shops,
  Company,
  Product,
  Forwarder,
  ParentShops,
  Return,
  Discount,
  PlateNumber,
  CommonDiscount
} from '../Pages';
import { Auth } from '../Config'

const Index = () => {

  return (

    <BrowserRouter>
      <Suspense fallback={<Spin className={style.spin} tip='Yüklənir...' />}>
        <Routes>
          <Route path='login' element={<Login />}>
          </Route>

          <Route path='/' element={<Auth><Layout /></Auth>}>
            <Route index element={<Auth><Home /></Auth>} />
            {/* <Route path='order' element={<Outlet />}>
            </Route> */}
            <Route path='order' element={<Auth><Admin /></Auth>} />
            <Route path="company" element={<Auth><Company /></Auth>} />
            <Route path="shops" element={<Auth><ParentShops /></Auth>} />
            <Route path="shop-branchs" element={<Auth><Shops /></Auth>} />
            <Route path="product" element={<Auth><Product /></Auth>} />
            <Route path="forwarder" element={<Auth><Forwarder /></Auth>} />
            <Route path="return" element={<Auth><Return /></Auth>} />
            <Route path="discount" element={<Auth><Discount /></Auth>} />
            <Route path="common-discount" element={<Auth><CommonDiscount /></Auth>} />
            <Route path="plate-number" element={<Auth><PlateNumber /></Auth>} />
            <Route path='accounting' element={<Outlet />}>
              <Route index element={<Navigate to={process.env.REACT_APP_ACCOUNTING} />} />
            </Route>

            <Route path='test' element={<Outlet />}>
              <Route index element={<TestComponents />} />
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