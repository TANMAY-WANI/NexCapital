import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {
  const loggedIn = await getLoggedInUser()
  
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                title='Welcome'
                subtext='Access and manage your transactions efficiently'
                type='greeting'
                user={loggedIn?.name.split(" ")[0]}
                />
                <TotalBalanceBox
                accounts = {[]}
                totalBanks={1}
                totalCurrentBalance={1200}
                />
            </header>
        </div>
        
        <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks = {[{currentBalance:123.23},{currentBalance:2020}]}
        />
    </section>
  )
}

export default Home