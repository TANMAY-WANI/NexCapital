import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async ({searchParams : {id,page}}:SearchParamProps) => {

  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser()
  
  
  const accounts = await getAccounts({
    userId: loggedIn.$id
  })
  

  if (!accounts)return;

  const appwriteItemId = (id as string) || accounts?.data[0]?.appwriteItemId

  const account =  await getAccount({appwriteItemId})

  const accData = accounts?.data;

  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                title='Welcome'
                subtext='Access and manage your transactions efficiently'
                type='greeting'
                user={loggedIn?.firstName}
                />
                <TotalBalanceBox
                accounts = {accData}
                totalBanks={accounts?.totalBanks}
                totalCurrentBalance={accounts?.totalCurrentBalance}
                />
            </header>
            <RecentTransactions
            accounts = {accData}
            transactions = {account?.transactions}
            appwriteItemId = {appwriteItemId}
            page = {currentPage}
            />
        </div>
        
        <RightSidebar
        user={loggedIn}
        transactions={account?.transactions}
        banks = {accData?.slice(0,2)}
        />
    </section>
  )
}

export default Home