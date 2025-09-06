import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const Home= () =>{
    return(
        <div className='container mt-20 mb-28'>
            <section className='hero-section  max-w-5xl'>
                    <div>
                        <h2 className='hero-heading'>Simple Way<br /> to Manage Your <span className='text-clr_accent_200'>Personal Finances</span> </h2>
                        <Link className='bg-clr_accent_200 px-12 py-3 rounded-lg font-medium text-lg  hover:bg-clr_accent_100 mt-6 inline-block text-white hover:text-white' to="register">Get Started</Link>
                    </div>                    
            </section>
            <section className='features-card mt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
                    <div className='card'>
                        <img className='w-12' src="/images/budget.svg" alt="" />
                        <p className='font-semibold'>Set monthly budgets</p>
                    </div>
                    <div className='card'>
                        <img className='w-12' src="/images/growthchart.svg" alt="" />
                        <p className='font-semibold'>monitor savings</p>
                    </div>
                    <div className='card'>
                        <img className='w-12' src="/images/dashboard-monitor.svg" alt="" />
                        <p className='font-semibold'>Visualize spending</p>
                    </div>
                    <div className='card'>
                        <img className='w-12' src="/images/catlog.svg" alt="" />
                        <p className='font-semibold'>categorize expenses</p>
                    </div>
                </div>
            </section>
            <section className='services flex flex-col gap-y-20 max-w-5xl mx-auto mt-24
             md:mt-36'>
                <div className='flex flex-col-reverse gap-y-6 md:flex-row items-center gap-x-12'>
                    <div className='flex-1 flex justify-center  shadow-2xl rounded-lg px-1.5 lg:px-0 bg-clr_primary_200 bg-opacity-20'>
                        <img className='w-full p-10 ' src="/images/Transaction@4x.png" alt="" />
                    </div>
                    <div className='flex-1 '>
                        <h2 className='text-3xl mb-2'>Insightful Financial Reports</h2>
                        <p className='text-clr_neutral_700 px-1.5 lg:p-0'>Access visual reports and analytics on spending, savings, and financial health to identify trends and make informed decisions.</p>
                    </div>
                </div>
                <div className='flex flex-col-reverse gap-y-6 md:flex-row-reverse items-center gap-x-12'>
                    <div className='flex-1 flex justify-center  shadow-2xl rounded-lg px-1.5 lg:px-0 bg-clr_primary_200 bg-opacity-20'>
                        <img className='w-full p-10 ' src="/images/budget.png" alt="" />
                    </div>
                    <div className='flex-1 '>
                        <h2 className='text-3xl mb-2'>Personalized Budgeting</h2>
                        <p className='text-clr_neutral_700 px-1.5 lg:p-0'>Set up tailored budgets across various spending categories, helping you stay within your financial limits and make adjustments as needed.</p>
                    </div>
                </div>
                <div className='flex flex-col-reverse gap-y-6 md:flex-row items-center gap-x-12'>
                    <div className='flex-1 flex justify-center  shadow-2xl rounded-lg px-1.5 lg:px-0 bg-clr_primary_200 bg-opacity-20'>
                        <img className='w-full p-10 ' src="/images/report.png" alt="" />
                    </div>
                    <div className='flex-1 '>
                        <h2 className='text-3xl mb-2'>Income & Expense Tracking</h2>
                        <p className='text-clr_neutral_700 px-1.5 lg:p-0'>Track all sources of income and categorize expenses to get a clear picture of your monthly cash flow and spending habits.</p>
                    </div>
                </div>
            </section>
            <section className='tetimonial mt-36'>
                <h2 className='text-center text-4xl mb-12'>What Our Users Says</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className='flex flex-col px-8 py-6 shadow-lg gap-y-10 bg-clr_primary_200 bg-opacity-5'>
                        <div className="flex justify-between items-center">
                            <span className='flex items-center gap-x-2'>
                                <img src="/images/profile11.png" alt="" className="w-14 border border-clr_accent_200 aspect-square object-cover p-1 rounded-full " />
                                <div>
                                    <p className='font-semibold'>devin keol</p>
                                    <p className='text-sm text-clr_accent_200'>chicgo</p>
                                </div>
                            </span>
                            <span className='flex gap-x-1'>
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar />
                            </span>
                        </div>
                        <p>"I’ve tried a lot of finance apps, but FinTrackr just gets it right. It’s like the app knows exactly what I need, when I need it, without being overwhelming. Perfect for those who want something simple yet powerful."</p>
                    </div>
                    <div className='flex flex-col px-8 py-6 shadow-lg gap-y-10 bg-clr_primary_200 bg-opacity-5'>
                        <div className="flex justify-between items-center">
                            <span className='flex items-center gap-x-2'>
                                <img src="/images/profile14.png" alt="" className="w-14 border border-clr_accent_200 aspect-square object-cover p-1 rounded-full " />
                                <div>
                                    <p className='font-semibold'>Sikha Jain</p>
                                    <p className='text-sm text-clr_accent_200'>Los Angles</p>
                                </div>
                            </span>
                            <span className='flex gap-x-1'>
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar className='text-clr_accent_200' />
                            <FaStar />
                            </span>
                        </div>
                        <p>"I usually get lost in complicated finance tools, but FinTrackr keeps things simple and effective. The app’s design feels natural, so tracking my finances is something I actually look forward to. A perfect match for my needs!"</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;