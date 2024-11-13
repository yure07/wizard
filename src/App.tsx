import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenuOutline, IoArrowBack } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { Step1 } from "./components/Forms/Step1";
import { Step2 } from "./components/Forms/Step2";
import { Step3 } from "./components/Forms/Step3";

export interface DataFormProps{
  revenue: string
  startedBusiness: string
  plan: string
  dateBusiness: string | undefined
  legalName: string
  zipCode: string
  firstName: string
  lastName: string
}

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [dataForm, setDataForm] = useState<DataFormProps>({
    revenue: '',
    startedBusiness: '',
    plan: '',
    dateBusiness: '',
    legalName: '',
    zipCode: '',
    firstName: '',
    lastName: ''
  })
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)

  const handleRevenueSelect = (revenue: string) => {
    setDataForm((prev) => ({ ...prev, revenue }));
    setBtnDisabled(false)
  }

  const handleChangeDataStep2 = (startedBusiness: string, plan: string, legalName: string, zipCode: string,  dateBusiness?: string) => {
    setDataForm((prev) => ({ ...prev, startedBusiness, plan, legalName, zipCode, dateBusiness }))
  }

  const handleChangeDataStep3 = (firstName: string, lastName: string) => {
    setDataForm((prev) => ({ ...prev, firstName, lastName}))
  }

  const nextStep = () => {
    if(currentStep === 1 && dataForm.revenue === '') return 

    if(currentStep < 3){
      setCurrentStep(currentStep+1)
    } else {
      console.log(dataForm)
    }
  }

  return (
    <div className="relative w-full min-h-screen">

      <header className="flex flex-row items-center h-16 px-4 bg-[#f3f3ff] md:bg-transparent md:px-0">
        <div className="flex items-center md:w-[45%] h-full md:bg-[#f3f3ff] md:px-4 lg:px-32">
          <img src="/logo.svg" alt="logo" className="w-32" />
        </div>
        <div className="flex flex-row items-center ml-auto gap-3 md:gap-6 md:px-4 lg:px-32">
          <span className="hidden md:block">(888) 881-9378 (WEST)</span>
          <span className="font-bold text-[#474744] text-xs">Log in</span>
          <IoMenuOutline size={25} onClick={() => setShowMenu(!showMenu)} />
        </div>
      </header>

      {showMenu && (
        <div className="absolute w-80 h-screen right-0 top-0 text-[#474744] bg-white font-semibold z-20">
          <div className="flex flex-row items-center h-14 px-4">
            <span className="text-2xl">Menu</span>
            <IoMdClose 
              size={25} 
              onClick={() => setShowMenu(false)}
              className="ml-auto mt-1"
            />
          </div>
          <hr className="w-full border-[#474744]" />
          <nav className="ml-20 mt-8 h-[75%]">
            <ul className="flex flex-col gap-7">
              <li><a href="/">Home</a></li>
              <li><a href="/">About us</a></li>
              <li><a href="/">Loan types</a></li>
              <li><a href="/">Partners</a></li>
              <li><a href="/">Privacy Policy</a></li>
            </ul>
          </nav>
          <div className="flex flex-col gap-2">
            <hr className="w-full border-[#474744]" />
            <span className="font-normal underline text-xs text-center">Already have an account?</span>
            <button type="button" className="w-[90%] bg-[#623cd0] text-white self-center h-10 rounded-md">Log in</button>
          </div>
        </div>
      )}

      {showMenu && (
        <button
          type="button"
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 bg-black opacity-40 z-10"
        />
      )}

      <section className="flex flex-col md:flex-row">
        <button 
          type="button" 
          className="flex items-center bg-[#f3f3ff] text-[#474744] font-semibold gap-1 pl-5 md:absolute md:mt-8 md:ml-2 lg:ml-40"
          onClick={() => {
            if(currentStep > 1){
              setCurrentStep(currentStep-1)
            }
          }}
        >
          <IoArrowBack size={18} className="mt-[2px]"/>
          Back
        </button>
        <section className="flex flex-row items-center justify-center px-4 w-full h-56 bg-[#f3f3ff] md:flex-col md:w-[45%] md:h-screen md:justify-normal md:items-start md:pl-6 md:pt-24 lg:pl-48">
          <div className="flex flex-col items-center gap-1 md:flex-row md:items-start">
            <div className="flex flex-col md:items-center">
              <div className={`flex items-center justify-center w-8 h-8 ${currentStep >= 2 ? 'bg-[#1aa5a4]' : 'bg-[#40258d]'} rounded-full text-white`}>
                {currentStep >= 2 ? (
                  <FaCheck/>
                ) : '1'} 
              </div>
              <span className={`hidden w-1 h-28 ${currentStep === 1 ? 'bg-[#b3a5eb]' : 'bg-[#1aa5a4]'} rounded-sm md:block`}/>
            </div>
            <div className="hidden md:flex flex-col ml-2 font-semibold">
              <h3>Financial information</h3>
              <span className="w-48 text-xs mt-1 text-[#474744]">Help us assess your business financial profile.</span>
            </div>
            <span className="text-xs text-[#474744] md:hidden">Financial</span>
          </div>
          <span className={`w-[30%] h-1 ${currentStep === 1 ? 'bg-[#b3a5eb]' : 'bg-[#1aa5a4]'} rounded-sm -mt-2 md:hidden`}/>
          <div className="flex flex-col items-center gap-1 md:flex-row md:items-start">
            <div className="flex flex-col md:items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 ${currentStep === 1 ? 'bg-[#b3a5eb]' : currentStep === 2 ? 'bg-[#40258d]' : currentStep === 3 ? 'bg-[#1aa5a4]' : null} rounded-full text-white md:my-1`}>
                {currentStep === 3 ? (
                  <FaCheck/>
                ) : '2'}
              </div>
              <span className={`hidden w-1 h-28 ${currentStep > 2 ? 'bg-[#1aa5a4]' : 'bg-[#b3a5eb]'} rounded-sm md:block`}/>
            </div>
            <div className={`hidden md:flex flex-col ml-2 font-semibold ${currentStep >= 2 ? 'text-black' : 'text-[#b3a5eb]'}`}>
              <h3>Business information</h3>
              <span className="w-48 text-xs mt-1">Provide your business details and start date.</span>
            </div>
            <span className="text-xs text-[#474744] md:hidden">Business</span>
          </div>
          <span className={`w-[30%] h-1 ${currentStep === 3 ? 'bg-[#1aa5a4]' : 'bg-[#b3a5eb]'} rounded-sm -mt-2 md:hidden`}/>
          <div className="flex flex-col items-center gap-1 md:flex-row md:items-start">
            <div className="flex flex-col md:items-center">
              <div className={`flex items-center justify-center w-8 h-8 ${currentStep === 3 ? 'bg-[#623cd0]' : 'bg-[#b3a5eb]'} rounded-full text-white md:my-1`}>
                3
              </div>
            </div>
            <div className={`hidden md:flex flex-col ml-2 font-semibold ${currentStep === 3 ? 'text-black' : 'text-[#b3a5eb]'} `}>
              <h3>Personal details</h3>
              <span className="w-48 text-xs mt-1">Share your name, contact details, and create your account.</span>
            </div>
            <span className="text-xs text-[#474744] md:hidden">Personal</span>
          </div>
        </section>

        <section className="flex flex-col mt-4 md:w-[55%]">
          {currentStep === 1 && (
            <Step1 onSelectRevenue={handleRevenueSelect} revenueSaved={dataForm.revenue} setDisableBtn={setBtnDisabled}/>
          )}
          {currentStep === 2 && (
            <Step2 onChangeDataStep2={handleChangeDataStep2} setDisableBtn={setBtnDisabled} dataForm={dataForm}/>
          )}
          {currentStep === 3 && (
            <Step3 onChangeDataStep3={handleChangeDataStep3} setDisableBtn={setBtnDisabled} currentStep={currentStep}/>
          )}
          <div className="flex flex-col w-[90%] h-32 self-center my-12 bg-[#f0fafa] border border-[#d0dffd] rounded-md text-xs font-bold py-3 md:px-12 md:w-[85%] lg:w-[80%] lg:self-start lg:ml-8">
            <span className="text-center md:text-start">As a reminder of 1West's requirements:</span>
            <ul className="flex flex-col list-disc self-center md:self-start ml-20 gap-2 mt-3 md:ml-9">
              <li>Must be in business for at least 3 months</li>
              <li>Must have a business checking account</li>
              <li>Must do at least $5k per month in revenue</li>
            </ul>
          </div>
          <button 
            type="button" 
            className={`w-[90%] h-10 rounded-md self-center text-white font-semibold mb-2 md:w-[85%] lg:w-[80%] lg:self-start lg:ml-8 ${btnDisabled ? 'bg-[#b3a5eb]' : 'bg-[#623cd0]'}`}
            onClick={nextStep}
            disabled={btnDisabled}
          >
            Proceed
          </button>
        </section>


      </section>

    </div>
  );
}

export default App;
