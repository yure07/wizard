import { useEffect, useState } from "react";
import { LuBadgeCheck } from "react-icons/lu";

interface Step3Props {
  onChangeDataStep3: (firstName: string, lastName: string) => void;
  setDisableBtn: React.Dispatch<React.SetStateAction<boolean>>
  currentStep: number
}

interface DataStep3Props{
  firstName: string
  lastName: string
}

export const Step3 = ({ onChangeDataStep3, setDisableBtn, currentStep }: Step3Props) => {
  const [dataStep3, setDataStep3] = useState<DataStep3Props>({
    firstName: '',
    lastName: ''
  })

  useEffect(() => {
    if((dataStep3.firstName === '' || dataStep3.lastName === '') && currentStep === 3){
      setDisableBtn(true)
    } else {
      setDisableBtn(false)
    }
  }, [dataStep3, setDisableBtn, currentStep])
  
  return(
    <>
    <div className="w-full px-8">
      <div className="flex flex-row w-full self-center mb-3 bg-[#dff1dd] rounded-md border p-2 gap-3 lg:w-[87%]">
        <LuBadgeCheck size={32} className="text-[#8abc83]"/>
        <div className="flex flex-col w-[95%]">
          <h1 className="font-semibold w-32">Congratulations!</h1>
          <p className="text-xs">Based on the information you provided, you have been pre-qualified for one or more of our products. Complete your profile to proceed.</p>
        </div>
      </div>
    </div>
      <article className="flex flex-col w-full px-8">
        <span className="w-full uppercase text-[#474744] font-semibold text-lg ">Personal Details</span>
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <span className="text-[#474744] mt-2 lg:w-[87%]">We ask for some personal information to keep your account secure and make our services more useful.</span>
      </article>
      <section className="flex flex-col px-5 mt-6 md:px-8">
        <label htmlFor="first-name" className="font-semibold">First Name</label>
        <input 
          type="text" 
          name='first-name'
          className='border h-12 mt-1 rounded-md px-4 placeholder:font-semibold lg:w-[87%]' 
          onChange={(e) => {
            setDataStep3((prev) => ({ ...prev, firstName: e.target.value }))
            onChangeDataStep3(e.target.value, dataStep3.lastName)
          }}
        />
        <label htmlFor="last-name" className="font-semibold mt-6">Last Name</label>
        <input 
          type="text" 
          name='las-name'
          className='border h-12 mt-1 rounded-md px-4 placeholder:font-semibold lg:w-[87%]' 
          onChange={(e) => {
            setDataStep3((prev) => ({ ...prev, lastName: e.target.value }))
            onChangeDataStep3(dataStep3.firstName, e.target.value)
          }}
        />
      </section>
    </>
  )
}